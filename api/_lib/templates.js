import { webcrypto } from 'node:crypto';
const crypto = globalThis.crypto || webcrypto;

export const PDF_TEMPLATES = {
  'TPL-NDA-V2': (data) => `
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
        <p>The parties wish to explore a business opportunity of mutual interest and may disclose confidential information to each other.</p>
      </div>
      <div class="section">
        <div class="section-title">2. Governing Law</div>
        <p>This Agreement shall be governed by the laws of <strong>${data.governingLaw || 'California'}</strong>.</p>
      </div>
      <div class="section">
        <div class="section-title">3. Term</div>
        <p>Obligations survive for <strong>${data.termYears || '3'}</strong> years from disclosure.</p>
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
      <div class="footer">Powered by Foxit Sentinel Pro • Trace ID: ${crypto.randomUUID().slice(0, 8)}</div>
    </body>
    </html>
  `,

  'TPL-SVC-V1': (data) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page { margin: 2.5cm; }
        body { font-family: Helvetica, sans-serif; line-height: 1.5; color: #374151; font-size: 14px; }
        .header { background: #3e1841; color: white; padding: 40px; display: flex; justify-content: space-between; }
        .brand { font-weight: 900; font-size: 20px; }
        .brand span { color: #fc6408; }
        h1 { margin: 0; font-size: 24px; font-weight: 200; text-transform: uppercase; }
        .content { padding: 40px; }
        .client-box { background: white; border-radius: 8px; padding: 30px; border-bottom: 4px solid #fc6408; margin-bottom: 30px; }
        .label { font-size: 9px; font-weight: bold; color: #9ca3af; text-transform: uppercase; margin-bottom: 5px; }
        .value { font-size: 18px; font-weight: bold; color: #111827; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { text-align: left; font-size: 10px; text-transform: uppercase; color: #6b7280; border-bottom: 1px solid #e5e7eb; padding: 10px 5px; }
        td { padding: 15px 5px; border-bottom: 1px solid #f3f4f6; }
        .rate { color: #fc6408; font-weight: 700; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="brand">SENTINEL <span>PRO</span></div>
        <div><h1>Master Service Agreement</h1><div style="font-size:10px;opacity:0.7">REF: MSA-${crypto.randomUUID().slice(0,6).toUpperCase()}</div></div>
      </div>
      <div class="content">
        <div class="client-box">
          <div class="label">Prepared For</div>
          <div class="value">${data.clientName || 'Valued Client'}</div>
          <div style="margin-top:15px"><div class="label">Effective Date</div><div>${data.effectiveDate || new Date().toLocaleDateString()}</div></div>
        </div>
        <p><strong>Scope:</strong> ${data.projectScope || 'General Software Development Services'}</p>
        <table>
          <thead><tr><th>Service</th><th>Model</th><th>Rate</th></tr></thead>
          <tbody>
            <tr><td>Professional Services</td><td>Hourly</td><td class="rate">${data.billingRate || '$150/hr'}</td></tr>
            <tr><td>Architecture & Design</td><td>Fixed Fee</td><td>Included</td></tr>
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `,

  'TPL-EMP-V4': (data) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page { margin: 2.5cm; }
        body { font-family: 'Georgia', serif; line-height: 1.8; color: #111; max-width: 700px; margin: 0 auto; font-size: 15px; }
        .logo { font-family: Helvetica, sans-serif; font-weight: 900; font-size: 20px; color: #fc6408; margin-bottom: 20px; }
        .logo span { color: #3e1841; }
        .date { font-family: Helvetica, sans-serif; font-size: 12px; color: #666; margin-bottom: 40px; }
        h1 { font-family: Helvetica, sans-serif; font-size: 28px; color: #111; margin-bottom: 40px; }
        .highlight-box { background: #fff7ed; border-left: 4px solid #fc6408; padding: 20px 30px; margin: 30px 0; }
        .highlight-row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dotted #fdba74; padding-bottom: 10px; }
        .highlight-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .h-label { font-family: Helvetica, sans-serif; font-size: 11px; text-transform: uppercase; font-weight: bold; color: #9a3412; }
        .h-value { font-weight: bold; color: #111; }
        .sign-line { border-top: 1px solid #111; width: 250px; margin: 40px 0 5px; }
        .sign-meta { font-family: Helvetica, sans-serif; font-size: 11px; color: #666; text-transform: uppercase; }
      </style>
    </head>
    <body>
      <div class="logo">SENTINEL <span>PRO HR</span></div>
      <div class="date">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      <h1>Offer of Employment</h1>
      <p>Dear <strong>${data.candidateName || 'Candidate'}</strong>,</p>
      <p>We are thrilled to offer you the position of <strong>${data.position || 'Employee'}</strong> at Sentinel Corp.</p>
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
      <p><strong>Benefits:</strong> Full medical, dental, vision, 401(k) matching, and unlimited PTO.</p>
      <p>This offer is contingent upon successful background verification. By signing, you accept these terms.</p>
      <p>We look forward to building the future with you.</p>
      <div class="sign-line"></div>
      <div class="sign-meta">Alexander P. Foxit<br>Chief Executive Officer, Sentinel Corp</div>
    </body>
    </html>
  `
};
