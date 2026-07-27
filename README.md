# 🌾 AgriVision AI — Smart Crop Health & Disease Diagnostic System

> **Multimodal Crop Pathology, Microclimate Telemetry & Dialect Voice Remedies Powered by Gemma 4 / Gemini AI**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Render-10B981?style=for-the-badge&logo=render)](https://agrivision-cw5i.onrender.com/)
[![Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20TypeScript%20%7C%20Express%20%7C%20Tailwind%20v4-blue?style=for-the-badge&logo=typescript)](https://agrivision-cw5i.onrender.com/)
[![AI Engine](https://img.shields.io/badge/AI%20Engine-Gemma%204%20Multimodal-7C3AED?style=for-the-badge&logo=google)](https://agrivision-cw5i.onrender.com/)

---

## 🌟 Overview

**AgriVision AI** is an intelligent agricultural vision and field audit platform designed to assist smallholder farmers, agronomists, and agricultural extension workers. Utilizing multimodal visual reasoning models (**Gemma 4** / **Gemini**), AgriVision AI analyzes leaf scan images to identify crop diseases, calculate severity scores, predict economic yield loss, and deliver actionable organic and chemical remedies.

To bridge language barriers in rural farming communities, AgriVision AI includes a **multilingual voice engine** that translates diagnostic findings into local spoken African and regional dialects (*Twi, Hausa, Yoruba, Swahili, French, English*).

---

## ✨ Key Features

- **📸 Multimodal Leaf Scan Diagnostics**: Upload or capture crop leaf photos to instantly receive pathology diagnoses, severity levels, affected area percentages, and diagnostic confidence scores.
- **🗣️ Local Dialect Audio Guidance**: Spoken voice remedy guides in local languages (*Twi, Hausa, Yoruba, Swahili, French, English*) with customizable voice personas.
- **🌡️ Station Microclimate Telemetry**: Real-time microclimate monitoring (temperature, humidity, spore risk indexes, rainfall) across agricultural research stations (e.g., Ashanti Cocoa Belt, Rift Valley Maize, Northern Savanna).
- **📊 Field Scan History & CSV Exports**: Comprehensive diagnostic log history with CSV export capabilities for field audit reporting.
- **🧮 Agronomic Loss & Dosage Calculators**: Crop loss prevention estimators and chemical spray volume dosage calculators.
- **🚀 Competition & Pitch Deck Suite**: Built-in hackathon pitch deck generator, project track explorer, and AI judge simulator.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React Icons, Motion (Framer Motion)
- **Backend**: Express.js, Node.js (Full-stack Express + Vite integration)
- **AI Integration**: `@google/genai` (Gemma 4 & Gemini Multimodal models)
- **Build Tools**: Vite, `tsx`, `esbuild`

---

## 📂 Project File Structure

```text
agrivision-ai/
├── .env.example                # Example environment variables setup
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML template entry point
├── metadata.json               # Applet metadata & frame permissions
├── package.json                # Dependencies, build & start scripts
├── server.ts                   # Express server entry point (Vite dev middleware & production static server)
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration with Tailwind CSS v4
│
├── public/                     # Static assets & public resources
│
└── src/                        # Main application source code
    ├── App.tsx                 # Core App layout & main tab routing logic
    ├── index.css               # Global CSS stylesheet (@import "tailwindcss")
    ├── main.tsx                # React root rendering entry point
    ├── types.ts                # TypeScript interfaces, types & data models
    │
    ├── components/             # Modular React UI components
    │   ├── AgriVisionApp.tsx   # Core Leaf Scanner & Field Audit Dashboard
    │   ├── Header.tsx          # Navigation header & station quick-selectors
    │   ├── IdeaExplorer.tsx    # Innovation tracks & project concept browser
    │   ├── IdeaSupercharger.tsx# AI-driven project concept generator
    │   ├── JudgeSimulator.tsx  # AI Hackathon Judge evaluation feedback tool
    │   ├── LivePrototypes.tsx  # Live interactive prototype demonstrator
    │   ├── PitchDeckGenerator.tsx # 3-Minute Competition Pitch Deck builder
    │   └── SampleGallery.tsx   # Preset crop disease scan sample gallery
    │
    └── data/                   # Static data stores & preset configurations
        ├── cropSamples.ts      # Leaf pathology scan sample datasets
        ├── farmSites.ts        # Farm stations & microclimate telemetry data
        ├── presetIdeas.ts      # Innovation track ideas & domain benchmarks
        └── prototypesData.ts   # Interactive prototype templates & workflows
