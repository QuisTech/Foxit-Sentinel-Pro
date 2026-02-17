
export const PDF_TEMPLATES = {
  'TPL-NDA-V2': (data: any) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page { margin: 2.5cm; }
        body { font-family: 'Times New Roman', serif; line-height: 1.6; color: #1f2937; max-width: 800px; margin: 0 auto; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #fc6408; padding-bottom: 20px; margin-bottom: 40px; }
        .logo { font-family: Helvetica, sans-serif; font-weight: 900; font-size: 24px; color: #3e1841; text-transform: uppercase; letter-spacing: -1px; }
        .logo span { color: #fc6408; }
        .doc-title { font-family: Helvetica, sans-serif; text-align: right; }
        h1 { font-size: 18px; text-transform: uppercase; letter-spacing: 2px; margin: 0; color: #3e1841; }
        .ref-code { font-size: 10px; color: #9ca3af; margin-top: 4px; }
        
        .section { margin-bottom: 25px; }
        .section-title { font-family: Helvetica, sans-serif; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #3e1841; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin-bottom: 10px; }
        
        .party-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
        .party-label { font-size: 10px; text-transform: uppercase; color: #6b7280; font-weight: bold; margin-bottom: 4px; }
        .party-name { font-size: 16px; font-weight: bold; color: #111827; }

        .signature-block { margin-top: 60px; display: flex; justify-content: space-between; gap: 40px; }
        .signature-box { flex: 1; }
        .signature-line { border-top: 1px solid #374151; margin-top: 40px; margin-bottom: 8px; }
        .signature-label { font-size: 10px; text-transform: uppercase; color: #6b7280; }

        .footer { position: fixed; bottom: 0; left: 0; right: 0; text-align: center; font-size: 9px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding: 15px 0; font-family: Helvetica, sans-serif; }
      </style>
    </head>
    <body>
      
      <div class="header">
        <div class="logo">SENTINEL <span>PRO</span></div>
        <div class="doc-title">
          <h1>Mutual Non-Disclosure Agreement</h1>
          <div class="ref-code">REF: NDA-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}</div>
        </div>
      </div>

      <div class="party-box">
        <div>
          <div class="party-label">Disclosing Party</div>
          <div class="party-name">${data.partyA || '[Party A Name]'}</div>
        </div>
        <div>
          <div class="party-label">Receiving Party</div>
          <div class="party-name">${data.partyB || '[Party B Name]'}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">1. Purpose</div>
        <p>The parties wish to explore a business opportunity of mutual interest. In connection with this opportunity, each party may disclose to the other certain private, confidential, technical, and business information that the disclosing party desires the receiving party to treat as strictly confidential.</p>
      </div>

      <div class="section">
        <div class="section-title">2. Definition of Confidential Information</div>
        <p>"Confidential Information" means any information disclosed by either party to the other, either directly or indirectly, in writing, orally, or by inspection of tangible objects (including without limitation documents, prototypes, samples, plant, and equipment), which is designated as "Confidential," "Proprietary," or some similar designation.</p>
      </div>

      <div class="section">
        <div class="section-title">3. Governing Law & Jurisdiction</div>
        <p>This Agreement shall be governed by and construed in accordance with the laws of <strong>${data.governingLaw || 'California'}</strong>, without reference to conflict of laws principles. Both parties consent to the exclusive jurisdiction of the state and federal courts located therein.</p>
      </div>

      <div class="section">
        <div class="section-title">4. Term of Agreement</div>
        <p>The obligations of this Agreement shall survive for a period of <strong>${data.termYears || '3'}</strong> years from the date of disclosure of the Confidential Information, or until such time as the Confidential Information becomes public knowledge through no fault of the receiving party.</p>
      </div>

      <div class="signature-block">
        <div class="signature-box">
          <div class="party-name">${data.partyA || '[Party A Name]'}</div>
          <div class="signature-line"></div>
          <div class="signature-label">Authorized Signature</div>
          <div style="margin-top: 5px; font-size: 12px;">Date: ${new Date().toLocaleDateString()}</div>
        </div>
        <div class="signature-box">
          <div class="party-name">${data.partyB || '[Party B Name]'}</div>
          <div class="signature-line"></div>
          <div class="signature-label">Authorized Signature</div>
          <div style="margin-top: 5px; font-size: 12px;">Date: ${new Date().toLocaleDateString()}</div>
        </div>
      </div>

      <div class="footer">
         Powered by Foxit Sentinel Pro • Auditable Agreement Engine • Trace ID: ${crypto.randomUUID().slice(0, 8)}
      </div>
    </body>
    </html>
  `,

  'TPL-SVC-V1': (data: any) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page { margin: 2.5cm; }
        body { font-family: Helvetica, sans-serif; line-height: 1.5; color: #374151; font-size: 14px; }
        
        .header-bg { position: absolute; top: 0; left: 0; right: 0; height: 120px; background: #3e1841; z-index: -1; }
        .header { color: white; padding: 40px 60px 0 60px; height: 100px; display: flex; justify-content: space-between; align-items: start; }
        .brand { font-weight: 900; font-size: 20px; letter-spacing: -0.5px; }
        .brand span { color: #fc6408; }
        .doc-type { text-align: right; }
        .doc-type h1 { margin: 0; font-size: 24px; font-weight: 200; text-transform: uppercase; letter-spacing: 2px; }
        .doc-type .meta { font-size: 10px; opacity: 0.7; margin-top: 5px; }

        .content { padding: 40px 60px; }
        
        .client-box { background: white; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); padding: 30px; margin-top: -40px; border-bottom: 4px solid #fc6408; }
        .label { font-size: 9px; font-weight: bold; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
        .value { font-size: 18px; font-weight: bold; color: #111827; }
        
        .scope-section { margin-top: 40px; }
        .scope-header { font-size: 12px; font-weight: bold; text-transform: uppercase; color: #fc6408; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
        .scope-content { background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 3px solid #3e1841; }

        table { width: 100%; border-collapse: collapse; margin-top: 30px; }
        th { text-align: left; font-size: 10px; text-transform: uppercase; color: #6b7280; border-bottom: 1px solid #e5e7eb; padding: 10px 5px; }
        td { padding: 15px 5px; border-bottom: 1px solid #f3f4f6; font-weight: 500; }
        
        .rate-highlight { color: #fc6408; font-weight: 700; }

        .terms { margin-top: 40px; font-size: 11px; color: #6b7280; columns: 2; gap: 40px; text-align: justify; }
        .terms p { margin-bottom: 10px; }
        .terms strong { color: #374151; }

      </style>
    </head>
    <body>
      
      <div class="header-bg"></div>
      <div class="header">
        <div class="brand">SENTINEL <span>PRO</span></div>
        <div class="doc-type">
          <h1>Master Service Agreement</h1>
          <div class="meta">REF: MSA-${crypto.randomUUID().slice(0,6).toUpperCase()}</div>
        </div>
      </div>

      <div class="content">
        <div class="client-box">
          <div style="display: flex; gap: 40px;">
            <div style="flex: 2;">
              <div class="label">Prepared For Client</div>
              <div class="value">${data.clientName || 'Valued Client'}</div>
            </div>
            <div style="flex: 1;">
              <div class="label">Effective Date</div>
              <div class="value" style="font-weight: 500;">${data.effectiveDate || new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        <div class="scope-section">
          <div class="scope-header">Scope of Work</div>
          <div class="scope-content">
            ${data.projectScope || 'General Software Development Services'}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Service Description</th>
              <th>Billing Model</th>
              <th>Rate / Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Professional Services & Consultation</td>
              <td>Hourly (Time & Materials)</td>
              <td class="rate-highlight">${data.billingRate || '$150/hr'}</td>
            </tr>
            <tr>
              <td>System Architecture & Design</td>
              <td>Fixed Fee</td>
              <td>Included</td>
            </tr>
          </tbody>
        </table>

        <div class="scope-header" style="margin-top: 40px;">Standard Terms & Conditions</div>
        <div class="terms">
          <p><strong>1. Services.</strong> Provider agrees to perform the services described in the Project Scope in a professional and workmanlike manner.</p>
          <p><strong>2. Payment.</strong> Invoices will be sent monthly. Payment is due within 30 days of receipt. Late payments shall incur interest at 1.5% per month.</p>
          <p><strong>3. Intellectual Property.</strong> Upon full payment, all deliverables shall become the exclusive property of the Client.</p>
          <p><strong>4. Confidentiality.</strong> Both parties agree to maintain the confidentiality of proprietary information disclosed during the course of the project.</p>
        </div>
      
        <div style="margin-top: 50px; text-align: center; color: #9ca3af; font-size: 10px;">
          Generated by Foxit Sentinel Pro Engine
        </div>
      </div>
    </body>
    </html>
  `,

  'TPL-EMP-V4': (data: any) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page { margin: 2.5cm; }
        body { font-family: 'Georgia', serif; line-height: 1.8; color: #111; max-width: 700px; margin: 0 auto; font-size: 15px; }
        
        .logo { font-family: Helvetica, sans-serif; font-weight: 900; font-size: 20px; color: #fc6408; margin-bottom: 20px; }
        .logo span { color: #3e1841; }
        
        .date { font-family: Helvetica, sans-serif; font-size: 12px; color: #666; margin-bottom: 40px; }
        
        h1 { font-family: Helvetica, sans-serif; font-size: 28px; color: #111; margin-bottom: 40px; letter-spacing: -0.5px; }
        
        .highlight-box { background: #fff7ed; border-left: 4px solid #fc6408; padding: 20px 30px; margin: 30px 0; }
        .highlight-row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dotted #fdba74; padding-bottom: 10px; }
        .highlight-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .h-label { font-family: Helvetica, sans-serif; font-size: 11px; text-transform: uppercase; font-weight: bold; color: #9a3412; }
        .h-value { font-weight: bold; color: #111; }

        .signature-section { margin-top: 60px; display: flex; gap: 40px; }
        .sign-block img { height: 50px; display: block; margin-bottom: 10px; }
        .sign-line { border-top: 1px solid #111; width: 250px; margin-bottom: 5px; }
        .sign-meta { font-family: Helvetica, sans-serif; font-size: 11px; color: #666; text-transform: uppercase; }

      </style>
    </head>
    <body>
      
      <div class="logo">SENTINEL <span>PRO HR</span></div>
      
      <div class="date">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      
      <h1>Offer of Employment</h1>
      
      <p>Dear <strong>${data.candidateName || 'Candidate'}</strong>,</p>

      <p>We are thrilled to offer you the position of <strong>${data.position || 'Employee'}</strong>. We believe your skills and experience will be an excellent fit for our innovative team at Sentinel Corp.</p>

      <div class="highlight-box">
        <div class="highlight-row">
          <div class="h-label">Annual Base Salary</div>
          <div class="h-value">${data.salary || '$100,000'}</div>
        </div>
        <div class="highlight-row">
          <div class="h-label">Equity Grant</div>
          <div class="h-value">${data.equity || '0.00%'}</div>
        </div>
        <div class="highlight-row">
          <div class="h-label">Performance Bonus</div>
          <div class="h-value">Target 15%</div>
        </div>
      </div>

      <p><strong>Benefits:</strong> You will be eligible for our comprehensive benefits package, including full medical, dental, and vision coverage, 401(k) matching, and unlimited PTO, effective on your first day of employment.</p>

      <p>This employment agreement is "at-will." By checking the acceptance box via Foxit eSign, you acknowledge your understanding and acceptance of these terms.</p>

      <p>We look forward to building the future with you.</p>

      <div class="signature-section">
        <div class="sign-block">
          <div style="font-family: 'Brush Script MT', cursive; font-size: 24px; color: #fc6408; margin-bottom: 10px;">Alexander P. Foxit</div>
          <div class="sign-line"></div>
          <div class="sign-meta">Alexander P. Foxit<br>Chief Executive Officer</div>
        </div>
      </div>
    </body>
    </html>
  `
};
