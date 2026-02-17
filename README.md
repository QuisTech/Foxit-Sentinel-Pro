# Foxit Sentinel Pro 🛡️

> **Securely orchestrate high-value agreements with AI validation, Foxit PDF watermarking, and an immutable audit ledger.**

![Foxit Sentinel Pro](https://github.com/user-attachments/assets/b0b43d6c-2c92-48e3-abad-42c79c46edd7)

Foxit Sentinel Pro is an auditable agreement orchestrator that automates the lifecycle of high-value contracts. It combines AI-driven data injection with Foxit's powerful PDF manipulation services to create a "glass pipeline" for legal documents—where every action is verified, logged, and cryptographically secured.

## 🌟 Key Features

### 1. Intelligent Autofill 🤖

Uses AI (simulated via regex/NLP patterns for demo) to parse deal context and instantly inject entity details (e.g., "Wayne Enterprises", "Gotham City") into complex legal templates like NDAs and MSAs.

### 2. Foxit-Powered Security 🔒

Leverages the **Foxit PDF Services API** to:

- **Dynamic Watermarking:** Applies context-aware overlays (e.g., "CONFIDENTIAL - ID: [Hash]") to generated documents.
- **Linearization:** Optimizes PDFs for "Fast Web View," enabling instant byte-streaming for large contracts.

### 3. Immutable Audit Ledger 📜

Every action—from template selection to final generation—is cryptographically hashed and logged in a side-by-side "Ledger" interface. This allows stakeholders to verify exactly when a document was processed and that its integrity remains intact.

---

## 🛠️ Tech Stack

- **Core PDF Engine:** Foxit PDF Services API
- **Frontend:** React 19, Framer Motion (Animations), Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Icons:** Lucide React
- **Build Tool:** Vite

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Foxit Developer Account (Client ID & Secret)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/QuisTech/Foxit-Sentinel-Pro.git
    cd Foxit-Sentinel-Pro
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the `server` directory:

    ```env
    FOXIT_CLIENT_ID=your_client_id
    FOXIT_CLIENT_SECRET=your_client_secret
    ```

    _(Note: For this demo, simulated credentials may be used if API keys are not provided)_

4.  **Run the Application**
    ```bash
    npm run dev
    ```
    This will start both the Frontend (Vite) on `http://localhost:5173` and the Backend API on `http://localhost:3001`.

---

## 📸 Screenshots

|        Dashboard Interface        |          Audit Ledger          |             PDF Output              |
| :-------------------------------: | :----------------------------: | :---------------------------------: |
| _(Add Dashboard Screenshot Here)_ | _(Add Ledger Screenshot Here)_ | _(Add PDF Preview Screenshot Here)_ |

---

## 🔮 Future Roadmap

- **Public Blockchain Integration:** Moving the internal ledger to Polygon/Solana for decentralized proof-of-existence.
- **Foxit eSign Integration:**Direct piping of linearized PDFs into eSign workflows.
- **Mobile Verification App:** QR-code scanner for physical document validation.

---

## 📄 License

MIT License. Built for the Foxit Developer Challenge 2026.
