# 🛡️ RentShield AI — Tenant Rights & Lease Agreement Auditor

> **Live Deployed URL:** [https://rent-shield-ai.vercel.app/](https://rent-shield-ai.vercel.app/)  
> **Public GitHub Repository:** [https://github.com/ruqiayaseen4/rent-shield-ai](https://github.com/ruqiayaseen4/rent-shield-ai)

---

## 📌 Project Overview & Problem Statement

### The Problem
Over 44 million households globally rent their homes. Residential lease agreements are dense, legalistic documents spanning 15 to 30 pages. Unscrupulous landlords and property managers frequently insert aggressive or legally unenforceable clauses—such as 20% semi-annual rent increases, 100% security deposit forfeitures for routine painting/renovation, zero-notice entry rights, or shifting structural plumbing costs onto tenants.

Most tenants—especially university students, young professionals, and immigrants—lack legal backgrounds and sign these predatory agreements without understanding their statutory rights.

### The Solution
**RentShield AI** is an intelligent tenant protection platform. Users select their jurisdiction (e.g., *Islamabad, Pakistan*, *California, USA*, *London, UK*) and paste their lease contract text. RentShield scans the document against tenant rights standards, categorizes clause risk levels, translates legalese into plain English, cites statutory protections, and automatically drafts a courteous counter-negotiation email for the tenant to present to the landlord.

---

## 🚀 Live App URL

- **Deployed Application:** [https://rent-shield-ai.vercel.app](https://rent-shield-ai.vercel.app) *(Hosted live on Vercel)*
- **Source Code:** [https://github.com/ruqiayaseen4/rent-shield-ai](https://github.com/ruqiayaseen4/rent-shield-ai)

---

## ✨ Features List

1. **Instant Lease Risk Scoring**: Calculates an overall risk index (0 to 100) indicating contract safety.
2. **Jurisdiction-Aware Context**: Evaluates clauses based on specified state, city, or regional tenancy guidelines.
3. **Structured Risk Tiering**:
   - 🔴 `CRITICAL_VIOLATION`: Potentially unlawful, predatory, or severe rights violations.
   - 🟡 `HIGH_RISK`: Aggressive, tenant-unfriendly clauses requiring modification.
   - 🟢 `FAIR_STANDARD`: Standard legal industry terms.
4. **Plain Language Translation**: Explains dense legalese in plain, understandable English.
5. **Statutory Protection Warnings**: Identifies standard tenant rights being violated or bypassed.
6. **Automated Landlord Counter-Drafting**: Generates an editable, professional email addressing flagged high-risk clauses.
7. **Fail-Safe Intelligent Engine**: Includes an automatic fallback rule parser to guarantee instant audit results if cloud AI models encounter network or rate-limit issues.

---

## 🤖 AI Feature & System Prompt Details

The app uses **Google Gemini AI (`gemini-2.0-flash`)** and **OpenAI (`gpt-4o-mini`)** to audit lease agreements and return structured JSON output.

### Custom System Instructions (`LEASE_AUDITOR_SYSTEM_PROMPT`)


You are RentShield AI, an expert tenant advocate and legal document auditor specializing in residential lease agreements and tenant protection rights.

YOUR MISSION:
Analyze the provided lease agreement text against standard tenant protection laws and high-risk clause benchmarks. Identify non-standard, aggressive, or potentially illegal clauses.

OUTPUT FORMAT:
Reply strictly with a valid JSON object matching this schema:
{
  "overallRiskScore": <number between 0 and 100>,
  "summary": "<2-3 sentence high-level summary of lease fairness>",
  "flaggedClauses": [
    {
      "clauseTitle": "<Short title of clause>",
      "originalText": "<Text from lease>",
      "riskLevel": "<"CRITICAL_VIOLATION" | "HIGH_RISK" | "FAIR_STANDARD">",
      "plainLanguageExplanation": "<Simple explanation>",
      "localRightWarning": "<Statutory warning>",
      "recommendation": "<Actionable advice>"
    }
  ],
  "counterEmailDraft": "<Landlord counter-negotiation email draft>"
}

RULES:
1. Do not include markdown code blocks or markdown text outside the raw JSON object.
2. Be objective, thorough, and protective of tenant rights.
3. If no state/city is provided, audit based on general fair housing and standard tenant law principles.
🛠️ Tools, Services, and Models Used
Frontend & App Framework: Next.js 14 / 16 (App Router)
Styling: Tailwind CSS
Programming Language: TypeScript
AI Models & API Integration: Google Gemini 2.0 Flash REST API / OpenAI GPT-4o-mini
Hosting & Continuous Deployment: Vercel
Version Control: Git & GitHub

💻 How to Run the Project Locally
1. Prerequisites
Node.js 18.x or higher installed.
2. Clone the Repository
code
Bash
git clone https://github.com/ruqiayaseen4/rent-shield-ai
cd rent-shield-ai
3. Install Dependencies
code
Bash
npm install
4. Configure Environment Variables
Create a .env.local file in the root folder of the project and add your API key:
code
Env
GEMINI_API_KEY=your_google_gemini_api_key_here
# OR
OPENAI_API_KEY=your_openai_api_key_here
5. Launch Development Server
code
Bash
npm run dev
Open http://localhost:3000 in your web browser.
