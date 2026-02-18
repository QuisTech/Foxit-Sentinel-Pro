# Foxit Sentinel Pro 🛡️

> _A deal died. Not because the terms were wrong — but because no one could prove the document hadn't been altered._

**[🚀 Live Demo →](https://foxitsentinelpro.vercel.app)**

---

## The Problem Nobody Talks About

Every year, **$1.5 trillion in commercial contracts** are disputed, delayed, or voided — not because of bad intent, but because of broken process.

A startup founder signs an NDA with a Fortune 500 partner. Three months later, the partner's legal team claims the document they received had different terms. There's no audit trail. No proof of when the watermark was applied. No cryptographic record of who generated what, and when.

The founder loses the deal. Possibly the company.

This isn't rare. It's the **default state** of legal document workflows in 2026:

- 📋 Agreements drafted manually in Word, emailed as attachments
- 🔓 No tamper-evidence — a PDF can be edited and re-saved invisibly
- 🕳️ No audit trail — "I sent it Tuesday" is not a legal defense
- ⏱️ Average contract turnaround: **3.4 days** of back-and-forth

**Foxit Sentinel Pro was built to make that story impossible.**

---

## What It Does

Sentinel Pro is an **auditable agreement orchestrator** — a system that takes a legal template, injects the right data, generates a cryptographically-secured PDF via Foxit's API, and logs every single action in an immutable ledger. In under 30 seconds.

| Before Sentinel Pro         | After Sentinel Pro                   |
| --------------------------- | ------------------------------------ |
| 3.4 days average turnaround | **< 30 seconds** end-to-end          |
| No tamper evidence          | SHA-256 hash logged at every step    |
| Manual copy-paste errors    | AI autofill from deal context        |
| "I think I sent v3"         | Immutable ledger with timestamps     |
| PDF emailed as attachment   | Linearized for instant web streaming |

---

## How It Works

### Step 1 — Intelligent Autofill 🤖

Type a company name or paste a deal brief. Sentinel Pro parses the context and populates the entire agreement — parties, governing law, term, compensation — in milliseconds. No copy-paste. No version confusion.

### Step 2 — Foxit PDF Generation 🔒

The populated template is sent to the **Foxit PDF Services API**, which renders a pixel-perfect legal document from HTML. This isn't a screenshot — it's a properly structured, print-ready PDF generated server-side.

### Step 3 — Security Overlay

The generated PDF is immediately watermarked (`CONFIDENTIAL — ID: [unique hash]`) and linearized for fast web streaming — both via Foxit's API. The watermark is applied _server-side_, making it impossible to strip without re-generating the document.

### Step 4 — Immutable Audit Ledger 📜

Every action — template selected, data injected, PDF generated, watermark applied — is SHA-256 hashed and written to a tamper-evident ledger. Stakeholders can verify document integrity at any future point.

```
Template Selected  →  SHA-256: a3f9c2...  →  09:14:22 UTC
Data Injected      →  SHA-256: b71e4d...  →  09:14:23 UTC
PDF Generated      →  SHA-256: c88f01...  →  09:14:51 UTC
Watermark Applied  →  SHA-256: d02a7c...  →  09:14:54 UTC
Linearized         →  SHA-256: e19b3f...  →  09:14:57 UTC
```

---

## Architecture

```
Browser (React + Vite)
        │
        ▼
Vercel Serverless Functions
        │
        ├── /api/health     → Environment check
        ├── /api/generate   → HTML → PDF  (Foxit API)
        └── /api/process    → Watermark + Linearize (Foxit API)
                │
                ▼
        api/_lib/
          ├── foxitClient.js   ← Foxit API client (ESM)
          └── templates.js     ← NDA, MSA, Offer Letter templates
```

All backend logic lives inside `api/_lib/` as plain ES Modules — bundled directly within the serverless function boundary so Vercel deploys without a TypeScript compilation step.

---

## Tech Stack

| Layer          | Technology                            |
| -------------- | ------------------------------------- |
| **Frontend**   | React 19, Framer Motion, Tailwind CSS |
| **Backend**    | Node.js + Express (Vercel Serverless) |
| **PDF Engine** | Foxit PDF Services API                |
| **Build Tool** | Vite                                  |
| **Deployment** | Vercel (Functions + CDN)              |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Foxit Developer Account ([Get credentials →](https://developers.foxit.com))

### Local Development

```bash
git clone https://github.com/QuisTech/Foxit-Sentinel-Pro.git
cd Foxit-Sentinel-Pro
npm install

# Create .env with your Foxit credentials
echo "FOXIT_CLIENT_ID=your_id" >> .env
echo "FOXIT_CLIENT_SECRET=your_secret" >> .env
echo "FOXIT_BASE_URL=https://na1.fusion.foxit.com" >> .env

npm run dev
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

Set `FOXIT_CLIENT_ID`, `FOXIT_CLIENT_SECRET`, and `FOXIT_BASE_URL` in your Vercel project environment variables.

---

## Director Mode 🎬

Click the **"API Design Pattern v4.2"** text in the footer to activate a self-driving demo that runs the complete workflow — autofill → generate → watermark → linearize → ledger — and saves a `.webm` recording automatically.

---

## Roadmap

- **Public Blockchain Ledger** — Anchor audit hashes to Polygon for decentralized proof-of-existence
- **Foxit eSign Integration** — Direct pipeline from linearized PDF into eSign workflows
- **Mobile Verification** — QR scanner to verify document authenticity on-site

---

## License

MIT License. Built for the **Foxit Developer Challenge 2026**.
