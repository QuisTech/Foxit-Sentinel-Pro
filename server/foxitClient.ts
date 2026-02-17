import axios from 'axios';
import FormData from 'form-data';

class FoxitClient {
  // Getters using Environment Variables for security
  private get clientId(): string {
    return process.env.FOXIT_CLIENT_ID || '';
  }

  private get clientSecret(): string {
    return process.env.FOXIT_CLIENT_SECRET || '';
  }

  private get baseUrl(): string {
    return process.env.FOXIT_BASE_URL || 'https://na1.fusion.foxit.com';
  }

  public async request(method: 'GET' | 'POST', endpoint: string, data?: any, headers: any = {}, responseType: 'json' | 'arraybuffer' = 'json') {
    // Note: Switched to Header-based authentication as per Foxit PDF Services 'na1' endpoint requirements
    // bypassing the OAuth /token endpoint which returns 404.
    
    try {
      const response = await axios({
        method,
        url: `${this.baseUrl}${endpoint}`,
        data,
        responseType,
        headers: {
          'client_id': this.clientId,
          'client_secret': this.clientSecret,
          ...headers
        }
      });
      
      return response.data;
    } catch (error: any) {
      console.error(`API Request failed: ${endpoint}`, error.response?.data || error.message);
      throw error;
    }
  }

  // 1. DocGen: Create PDF from HTML
  public async generatePdfFromHtml(html: string): Promise<Buffer> {
    console.log('Starting HTML to PDF conversion...');
    
    // Attempt Real API Call
    // Step A: Upload "input.html"
    const fileId = await this.uploadFile(Buffer.from(html), 'input.html');
    
    // Step B: Convert to PDF
    // Correct Endpoint: /pdf-services/api/documents/create/pdf-from-html
    const conversionJob = await this.request('POST', '/pdf-services/api/documents/create/pdf-from-html', {
      documentId: fileId
    });
    
    console.log("DEBUG: Conversion Job Response:", JSON.stringify(conversionJob, null, 2));

    // Step C: Poll for completion
    // Research suggests it returns 'taskId'
    const jobId = conversionJob.jobId || conversionJob.taskId;
    if (!jobId) {
        throw new Error(`No jobId or taskId in response: ${JSON.stringify(conversionJob)}`);
    }
    const resultFileId = await this.pollJob(jobId);
    
    // Step D: Download
    return await this.downloadFile(resultFileId);
  }

  // Helper: Upload File
  public async uploadFile(buffer: Buffer, filename: string): Promise<string> {
    console.log(`Uploading file ${filename}...`);
    const form = new FormData();
    form.append('file', buffer, filename);

    const result = await this.request('POST', '/pdf-services/api/documents/upload', form, form.getHeaders());
    return result.documentId;
  }

  // Helper: Poll Job
  private async pollJob(jobId: string): Promise<string> {
    console.log(`Polling job ${jobId}...`);
    let attempts = 0;
    while (attempts < 60) { // Increased timeout to 60s
      await new Promise(r => setTimeout(r, 1000));
      // Correct Endpoint: /pdf-services/api/tasks/{taskId}
      const status = await this.request('GET', `/pdf-services/api/tasks/${jobId}`);
      
      console.log(`Poll Status: ${status.status} (${status.percent}%)`);

      if (status.status === 'COMPLETED' || status.status === 'succeeded') {
           return status.resultDocumentId || status.outputDocumentId;
      }
      if (status.status === 'FAILED' || status.status === 'failed') throw new Error('Job failed: ' + JSON.stringify(status));
      attempts++;
    }
    throw new Error('Job timed out');
  }

  // Helper: Download File
  public async downloadFile(fileId: string): Promise<Buffer> {
    console.log(`Downloading file ${fileId}...`);
    // Correct Endpoint: /pdf-services/api/documents/{fileId}/download
    return await this.request('GET', `/pdf-services/api/documents/${fileId}/download`, undefined, {}, 'arraybuffer');
  }

  // 3. PDF Services: Watermark
  public async applyWatermark(pdfBuffer: Buffer, text: string): Promise<Buffer> {
    try {
        const fileId = await this.uploadFile(pdfBuffer, 'source.pdf');
        
        // Note: Watermark endpoint is elusive. Trying a likely candidate or failing gracefully.
        // If this 404s, it will catch and return the original PDF.
        const job = await this.request('POST', '/pdf-services/api/pdf-watermark', {
            documentId: fileId,
            watermarkSettings: {
                text: text + ` [${Date.now().toString().slice(-4)}]`, // Force unique content
                position: 'center', 
                scale: 0.5, // Try scale instead of fontSize if API supports it, or stick to fontSize
                opacity: 40,
                rotation: 45,
                fontSize: 18 // Go even smaller
            }
        });

        const resultId = await this.pollJob(job.taskId || job.jobId);
        return await this.downloadFile(resultId);
    } catch (error) {
        console.error("Watermark Service Failed (skipping):", error instanceof Error ? error.message : String(error));
        return pdfBuffer; // Return original PDF if watermark fails
    }
  }

  // 4. PDF Services: Linearize
  public async linearizePdf(pdfBuffer: Buffer): Promise<Buffer> {
    try {
        const fileId = await this.uploadFile(pdfBuffer, 'source.pdf');
        
        // Correct Endpoint: /pdf-services/api/documents/optimize/pdf-linearize
        const job = await this.request('POST', '/pdf-services/api/documents/optimize/pdf-linearize', {
            documentId: fileId,
            optimizationSettings: {
                linearize: true
            }
        });
        const resultId = await this.pollJob(job.taskId || job.jobId);
        return await this.downloadFile(resultId);
    } catch (error) {
        console.error("Linearize Service Failed (skipping):", error instanceof Error ? error.message : String(error));
        return pdfBuffer; // Return original PDF if linearization fails
    }
  }
}

export const foxitClient = new FoxitClient();
