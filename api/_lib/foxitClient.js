import axios from 'axios';
import FormData from 'form-data';

class FoxitClient {
  get clientId() {
    return process.env.FOXIT_CLIENT_ID || '';
  }

  get clientSecret() {
    return process.env.FOXIT_CLIENT_SECRET || '';
  }

  get baseUrl() {
    return process.env.FOXIT_BASE_URL || 'https://na1.fusion.foxit.com';
  }

  async request(method, endpoint, data, headers = {}, responseType = 'json') {
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
    } catch (error) {
      console.error(`API Request failed: ${endpoint}`, error.response?.data || error.message);
      throw error;
    }
  }

  async generatePdfFromHtml(html) {
    console.log('Starting HTML to PDF conversion...');
    const fileId = await this.uploadFile(Buffer.from(html), 'input.html');
    const conversionJob = await this.request('POST', '/pdf-services/api/documents/create/pdf-from-html', {
      documentId: fileId
    });
    console.log("DEBUG: Conversion Job Response:", JSON.stringify(conversionJob, null, 2));
    const jobId = conversionJob.jobId || conversionJob.taskId;
    if (!jobId) {
      throw new Error(`No jobId or taskId in response: ${JSON.stringify(conversionJob)}`);
    }
    const resultFileId = await this.pollJob(jobId);
    return await this.downloadFile(resultFileId);
  }

  async uploadFile(buffer, filename) {
    console.log(`Uploading file ${filename}...`);
    const form = new FormData();
    form.append('file', buffer, filename);
    const result = await this.request('POST', '/pdf-services/api/documents/upload', form, form.getHeaders());
    return result.documentId;
  }

  async pollJob(jobId) {
    console.log(`Polling job ${jobId}...`);
    let attempts = 0;
    while (attempts < 60) {
      await new Promise(r => setTimeout(r, 1000));
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

  async downloadFile(fileId) {
    console.log(`Downloading file ${fileId}...`);
    return await this.request('GET', `/pdf-services/api/documents/${fileId}/download`, undefined, {}, 'arraybuffer');
  }

  async applyWatermark(pdfBuffer, text) {
    try {
      const fileId = await this.uploadFile(pdfBuffer, 'source.pdf');
      const job = await this.request('POST', '/pdf-services/api/pdf-watermark', {
        documentId: fileId,
        watermarkSettings: {
          text: text + ` [${Date.now().toString().slice(-4)}]`,
          position: 'center',
          scale: 0.5,
          opacity: 40,
          rotation: 45,
          fontSize: 18
        }
      });
      const resultId = await this.pollJob(job.taskId || job.jobId);
      return await this.downloadFile(resultId);
    } catch (error) {
      console.error("Watermark Service Failed (skipping):", error instanceof Error ? error.message : String(error));
      return pdfBuffer;
    }
  }

  async linearizePdf(pdfBuffer) {
    try {
      const fileId = await this.uploadFile(pdfBuffer, 'source.pdf');
      const job = await this.request('POST', '/pdf-services/api/documents/optimize/pdf-linearize', {
        documentId: fileId,
        optimizationSettings: { linearize: true }
      });
      const resultId = await this.pollJob(job.taskId || job.jobId);
      return await this.downloadFile(resultId);
    } catch (error) {
      console.error("Linearize Service Failed (skipping):", error instanceof Error ? error.message : String(error));
      return pdfBuffer;
    }
  }
}

export const foxitClient = new FoxitClient();
