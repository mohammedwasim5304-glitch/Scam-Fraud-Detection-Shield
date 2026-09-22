# 🛡️ ScamShield AI - Cyber Threat & Fraud Detection Shield

> **A high-aesthetic, dark-mode cybersecurity command center powered by Google Gemini 1.5 Flash AI, Three.js 3D visualization, and Framer Motion.**

---

## 🌟 Overview

**ScamShield AI** is an advanced cybersecurity threat intelligence dashboard designed to analyze suspicious messages, job offers, rental listings, phishing emails, and web links in real-time. Powered by **Gemini 1.5 Flash API**, it evaluates text and URL vectors to expose advance-fee scams, equipment payment traps, free-domain hosting abuse, and fraudulent impersonations before users fall victim.

---

## ✨ Features & Highlights

- 🌐 **3D Cyber Command Center Background**: Rendered with `@react-three/fiber` and `@react-three/drei`, featuring a slowly rotating 3D wireframe globe, glowing inner core, orbital rings, and floating particle fields.
- ⚡ **Deep Laser Scanning Animation**: A sweeping electric-blue neon laser line moves across the text/URL input area using **Framer Motion** while AI analyzes the threat.
- 🎯 **Dynamic SVG Threat Risk Gauge**: Animated circular progress meter transitioning smoothly between threat thresholds:
  - `0 - 30`: **Neon Emerald** (Verified Safe)
  - `31 - 70`: **Amber** (Moderate Risk)
  - `71 - 100`: **Pulsing Crimson** (Critical Threat)
- 🚨 **Red Alert Threat Alarm**: Automatically activates a crimson glowing border-pulse animation when detecting high-level threats (Risk Score 80+).
- ✍️ **Framer Motion Typewriter Effect**: Executive AI Threat Summaries stream word-by-word with smooth staggered entrance animations.
- 🚩 **Staggered Evidence & Action Cards**: Reveals red flags, severity badges (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`), exact text snippet evidence, AI threat explanations, and actionable security recommendations.
- 🔗 **Context-Aware Demo Scenarios**:
  - **Text Mode**: One-click quick fills for *Job Scam*, *Rental Trap*, and *Verified Text*.
  - **URL Mode**: One-click quick fills for *Scam URL* (free Weebly hosting abuse with `/pay-equipment` paths) and *Safe URL* (official corporate domains).
- 🤖 **Gemini 1.5 Flash API + Fallback Engine**: Production-ready structured JSON integration with automatic fallback simulation if no API key is provided or network calls fail.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework & Core** | React 19, Vite 8, TypeScript |
| **Styling & Theme** | Tailwind CSS v4, Glassmorphism, Custom Shadcn/ui Primitives |
| **3D & Canvas** | Three.js, `@react-three/fiber`, `@react-three/drei` |
| **Animations** | Framer Motion |
| **AI Intelligence** | Google Gemini 1.5 Flash API (`generateContent`) |
| **Icons & Helpers** | Lucide React, `clsx`, `tailwind-merge` |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18.0 or higher recommended)
- **npm** or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/mohammedwasim5304-glitch/Scam-Fraud-Detection-Shield.git
cd Scam-Fraud-Detection-Shield
```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Configure Environment Variables (Optional)
Create a `.env.local` file in the root directory and add your Google Gemini API key:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
*Note: If no API key is set, ScamShield AI automatically uses its built-in realistic AI simulation engine for zero-config demonstration.*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
Scam-Fraud-Detection-Shield/
├── src/
│   ├── components/
│   │   ├── CyberGlobe.jsx          # 3D Three.js wireframe globe & particle field
│   │   └── ShadcnComponents.jsx    # Glassmorphic Shadcn UI primitives (Card, Button, Badge, Tabs)
│   ├── lib/
│   │   └── utils.ts                # Tailwind class merger (clsx + tailwind-merge)
│   ├── App.jsx                     # Main Cybersecurity Dashboard Application
│   ├── index.css                   # Tailwind v4 configuration & base styles
│   └── main.tsx                    # Application entrypoint
├── public/                         # Public assets & icons
├── vite.config.ts                  # Vite configuration with Tailwind CSS plugin & path aliases
├── tsconfig.app.json               # TypeScript application configuration
└── package.json                    # Dependencies and scripts
```

---

## 🔑 AI Threat Detection Rules

ScamShield AI evaluates inputs against key threat indicators:
1. **Advance-Fee Equipment Scam**: Demands to wire money via Zelle, Western Union, or Crypto for company equipment.
2. **Rental Deposit Traps**: Landlord claims to be overseas and demands deposit wire before in-person viewing.
3. **Suspicious Domain Analysis**: Flags free web hosting (`weebly`, `wix`, `blogspot`, `ngrok`), typosquatting, or sketchy paths (`/pay-equipment-fee`).
4. **No-Interview Job Offers**: Instant hiring offers for high-pay entry-level roles without formal interviews.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
