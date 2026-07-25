import { ProjectIdea } from "../types";

export const PRESET_IDEAS: ProjectIdea[] = [
  {
    id: "omni-guard",
    title: "OmniGuard: Real-Time Deepfake & Voice Clone Defense",
    tagline: "Live browser extension & AI proxy detecting synthetic audio voice clones and deepfake video streams during critical calls.",
    track: "AI & Agents",
    noveltyScore: 98,
    wowFactor: "Live microphone & video feed analysis with real-time biometric spectral confidence gauge flashing red warning overlays on fake media.",
    problemStatement: "AI audio cloning and deepfake video scams have increased 800% in online interviews, wire transfers, and identity verifications.",
    solution: "Client-side WebAssembly spectral analysis combined with Gemini 3.6 Flash multimodal inference to flag synthetic audio artifacts in <150ms.",
    keyFeatures: [
      "Sub-150ms Spectral Anomaly Analyzer",
      "Facial Micro-Expression & Lighting Consistency Engine",
      "One-Click Forensic PDF Audit Trail Exporter"
    ],
    techStack: ["React 19", "Web Audio API", "Gemini 3.6 Flash", "Tailwind CSS"],
    demoScriptHook: "Watch as I speak into this mic using a real-time AI voice clone — within 100 milliseconds, OmniGuard flags the audio as 99.4% synthetic!",
    roadmap: [
      { hour: "0-4h", task: "Setup web audio analyzer pipeline & spectral visualizer canvas" },
      { hour: "4-12h", task: "Integrate Gemini multimodal verification backend endpoint" },
      { hour: "12-20h", task: "Build overlay UI & forensic PDF report exporter" },
      { hour: "20-24h", task: "Polish 3-minute live pitch script & mock call test" }
    ],
    hasLiveDemo: true,
    demoId: "omniguard"
  },
  {
    id: "echo-pulse",
    title: "EchoPulse AI: Non-Invasive Vocal Health & Stress Monitor",
    tagline: "Vocal resonance analyzer identifying respiratory strain, physical fatigue, and vocal cord anomalies from 5-second voice samples.",
    track: "Healthcare & Bio",
    noveltyScore: 96,
    wowFactor: "User speaks 5 seconds of audio; app instantly displays 3D radar bio-diagnostics and actionable recovery protocols.",
    problemStatement: "Early physiological strain and burnout are missed until acute symptoms appear, leading to lost productivity and medical escalation.",
    solution: "Extracts acoustic jitter, shimmer, and vocal harmonics from standard smartphone/laptop mics, using acoustic reasoning models to track health trends.",
    keyFeatures: [
      "5-Second Vocal Scan Engine",
      "3D Bio-Metrics Health Radar Visualization",
      "Personalized Recovery & Diaphragmatic Breathing Guidance"
    ],
    techStack: ["TypeScript", "Canvas Radar SVG", "Express Proxy", "Gemini 3.6 Flash"],
    demoScriptHook: "In just 5 seconds of speaking, EchoPulse detected my hidden physiological fatigue score before I even felt my morning headache.",
    roadmap: [
      { hour: "0-4h", task: "Implement Web Audio recorder and waveform analyzer" },
      { hour: "4-12h", task: "Build diagnostic AI prompt & scoring engine" },
      { hour: "12-20h", task: "Design medical-grade radar UI dashboard" },
      { hour: "20-24h", task: "Finalize demo presets for live judge testing" }
    ],
    hasLiveDemo: true,
    demoId: "echopulse"
  },
  {
    id: "clima-grid",
    title: "ClimaGrid: Decentralized Microgrid AI Balancing Engine",
    tagline: "Autonomous energy distribution optimizer matching local solar/battery generation with neighborhood EV charging demand in real time.",
    track: "Climate & Sustainability",
    noveltyScore: 95,
    wowFactor: "Interactive grid simulator showing real-time carbon reduction curves and dollar savings as simulated weather and load conditions shift.",
    problemStatement: "Over 30% of renewable solar power is lost due to grid congestion and poor localized battery discharge timing.",
    solution: "An intelligent multi-agent load optimizer that routes clean power to high-priority nodes while executing dynamic micro-carbon offset trades.",
    keyFeatures: [
      "Real-Time Grid Node Heatmap",
      "Autonomous AI Battery Discharge Scheduler",
      "Verifiable Carbon Saved Micro-Ledger"
    ],
    techStack: ["React 19", "Recharts / SVG Visualization", "Express", "Gemini AI"],
    demoScriptHook: "When a cloud passes over Neighborhood B, ClimaGrid automatically reroutes solar power from Neighborhood A in 3 milliseconds flat.",
    roadmap: [
      { hour: "0-4h", task: "Build SVG microgrid layout & dynamic node state simulator" },
      { hour: "4-12h", task: "Implement AI balancing algorithm & load curves" },
      { hour: "12-20h", task: "Design carbon offset metrics & cost calculator dashboard" },
      { hour: "20-24h", task: "Prepare judge live load-spike scenario" }
    ],
    hasLiveDemo: true,
    demoId: "climagrid"
  },
  {
    id: "lexi-guard",
    title: "LexiGuard AI: Real-Time Legal Contract Anomaly Detector",
    tagline: "Instant visual risk scanner for freelance contracts, NDAs, and terms of service that highlights predatory clauses and hidden liabilities.",
    track: "Future of Work & DevTools",
    noveltyScore: 94,
    wowFactor: "Upload or paste any 20-page legal PDF; receive a color-coded risk map with 1-click plain-English rewrite suggestions in 3 seconds.",
    problemStatement: "Freelancers and SMBs sign unfair contracts with non-compete traps, delayed payment terms, and infinite IP assignment due to lawyer costs.",
    solution: "Fine-tuned legal clause analyzer powered by Gemini 3.6 Flash that detects non-standard indemnification, liability caps, and termination penalties.",
    keyFeatures: [
      "Color-Coded Clause Risk Radar (High / Med / Low)",
      "Plain-English Clause Translator",
      "1-Click Counter-Offer Email Generator"
    ],
    techStack: ["React 19", "PDF Text Extraction", "Express Gemini Proxy", "Tailwind CSS"],
    demoScriptHook: "I pasted a standard 15-page client contract — LexiGuard immediately flagged a hidden 2-year global non-compete clause tucked on page 12!",
    roadmap: [
      { hour: "0-4h", task: "Build document drag-drop interface & text parser" },
      { hour: "4-12h", task: "Develop Gemini legal risk classification prompt" },
      { hour: "12-20h", task: "Create clause risk heatmap & counter-offer composer" },
      { hour: "20-24h", task: "Test with sample predatory NDAs for demo pitch" }
    ],
    hasLiveDemo: true,
    demoId: "lexiguard"
  },
  {
    id: "agri-vision",
    title: "AgriVision: Edge Crop Health & Disease Scanner",
    tagline: "Mobile-first computer vision leaf & soil scanner providing instant agronomic diagnoses and localized organic remedies.",
    track: "Multimodal & Vision",
    noveltyScore: 95,
    wowFactor: "Upload a photo of a diseased plant; receive instant bounding-box identification with organic treatment steps and weather risk prediction.",
    problemStatement: "40% of smallholder crop yields are lost to undetected plant diseases due to delayed access to agricultural experts.",
    solution: "Combines camera image parsing with Gemini 3.6 Flash multimodal vision reasoning to deliver immediate field diagnoses.",
    keyFeatures: [
      "Instant Crop Disease Bounding-Box Detection",
      "Multilingual Voice Audio Explanation for Farmers",
      "Organic Remedy & Localized Weather Advisory"
    ],
    techStack: ["React", "HTML5 Camera API", "Gemini Multimodal Vision", "Lucide"],
    demoScriptHook: "This infected leaf would take 3 days for a lab to analyze — AgriVision identifies Early Blight in 1.2 seconds with 98% accuracy.",
    roadmap: [
      { hour: "0-4h", task: "Build mobile-responsive camera capture preview" },
      { hour: "4-12h", task: "Connect Gemini Vision API with diagnostic schema" },
      { hour: "12-20h", task: "Build treatment cards & offline fallback store" },
      { hour: "20-24h", task: "Benchmark demo response speed" }
    ],
    hasLiveDemo: false
  },
  {
    id: "accessibility-mind",
    title: "AuraSight: AI Vision Assist for Non-Visual Web Navigation",
    tagline: "Real-time voice and gesture-driven AI browser co-pilot enabling visually impaired users to seamlessly navigate complex web apps.",
    track: "Education & Accessibility",
    noveltyScore: 97,
    wowFactor: "Blindfolded user speaks natural intent ('Find a cheap flight to Chicago'); AuraSight parses page layout and completes action via spoken feedback.",
    problemStatement: "Over 90% of top websites are inaccessible to screen readers due to missing ARIA tags and complex dynamic JavaScript components.",
    solution: "Captures live DOM snapshot + screenshot, using Gemini multimodal vision to construct an accessible interactive voice tree.",
    keyFeatures: [
      "DOM & Visual Spatial Understanding Engine",
      "Conversational Voice Action Controller",
      "Instant ARIA Tag Repair Proxy"
    ],
    techStack: ["React", "Web Speech Synthesis & Recognition API", "Gemini 3.6 Flash"],
    demoScriptHook: "Watch a blindfolded user buy a train ticket on a notoriously inaccessible website — AuraSight handles the entire flow in 20 seconds.",
    roadmap: [
      { hour: "0-4h", task: "Build speech recognition & synthesis controller" },
      { hour: "4-12h", task: "Integrate Gemini spatial DOM parser" },
      { hour: "12-20h", task: "Design live feedback HUD with high contrast accessibility" },
      { hour: "20-24h", task: "Practice blindfolded live demo run" }
    ],
    hasLiveDemo: false
  }
];
