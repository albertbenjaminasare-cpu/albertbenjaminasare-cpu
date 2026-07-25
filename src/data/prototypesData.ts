export interface DemoPrototype {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  description: string;
  sampleInputs: { label: string; value: string; extra?: any }[];
  accentColor: string;
}

export const DEMO_PROTOTYPES: Record<string, DemoPrototype> = {
  omniguard: {
    id: "omniguard",
    name: "OmniGuard Live Deepfake Detector",
    tagline: "Multimodal Voice & Video Forensic Spectral Analyzer",
    badge: "AI Security & Defense",
    description: "Upload or select a sample audio stream to analyze real-time spectral frequency jitter, vocal tract resonance, and AI clone probability.",
    accentColor: "indigo",
    sampleInputs: [
      {
        label: "Authentic Human Voice Sample (Recorded Live)",
        value: "Human Voice Stream: Natural pitch modulation, organic breath pause intervals, smooth formant transitions.",
        extra: { isDeepfake: false, confidence: 98.6, spectralScore: 92, status: "VERIFIED HUMAN VOICE" }
      },
      {
        label: "AI Voice Clone Sample (ElevenLabs / VALL-E)",
        value: "Cloned Audio Stream: High-frequency phase locking detected at 14.2kHz, unnatural silence gaps, zero micro-tremor.",
        extra: { isDeepfake: true, confidence: 99.4, spectralScore: 12, status: "SYNTHETIC VOICE DETECTED" }
      },
      {
        label: "Manipulated Deepfake Call (Finance Wire Request)",
        value: "Incoming Video Call Audio: Formant shift incongruity detected between mouth movement and acoustic resonance.",
        extra: { isDeepfake: true, confidence: 97.8, spectralScore: 24, status: "DEEPFAKE IMPERSONATION ALERT" }
      }
    ]
  },
  echopulse: {
    id: "echopulse",
    name: "EchoPulse Bio-Metrics Vocal Monitor",
    tagline: "Vocal Resonance Health & Fatigue Radar Scanner",
    badge: "Bio-Health & Diagnostic",
    description: "Evaluates acoustic shimmer, harmonic-to-noise ratio, and vocal strain from audio samples to map neurological and physical stress.",
    accentColor: "emerald",
    sampleInputs: [
      {
        label: "Rested Morning Vocal Baseline",
        value: "Audio Sample: Clear phonation, pitch stability 120Hz, low harmonic distortion.",
        extra: { stressLevel: "Low (18%)", fatigueIndex: "Optimal", radar: { physical: 90, mental: 94, respiratory: 95, vocal: 92, stamina: 88 } }
      },
      {
        label: "High Fatigue & Burnout Vocal Sample",
        value: "Audio Sample: Glottal closure friction, micro-tremor variance > 3.4%, reduced airflow resonance.",
        extra: { stressLevel: "High (84%)", fatigueIndex: "Severe Burnout Risk", radar: { physical: 42, mental: 38, respiratory: 55, vocal: 40, stamina: 35 } }
      },
      {
        label: "Respiratory Strain Sample (Mild Cold / Flu)",
        value: "Audio Sample: Nasal resonance shift, altered formant F1 frequency, high noise floor.",
        extra: { stressLevel: "Moderate (56%)", fatigueIndex: "Early Infection Strain", radar: { physical: 60, mental: 75, respiratory: 38, vocal: 50, stamina: 52 } }
      }
    ]
  },
  climagrid: {
    id: "climagrid",
    name: "ClimaGrid Microgrid Balancer",
    tagline: "Autonomous Microgrid Energy & Load Router",
    badge: "Climate Tech & IoT",
    description: "Simulates neighborhood microgrid power flow, solar generation fluctuations, EV battery discharge, and carbon offset calculations.",
    accentColor: "amber",
    sampleInputs: [
      {
        label: "Normal Solar Peak (12:00 PM - Sunny)",
        value: "Grid Status: 450 kW Solar Gen, 280 kW Demand. Surplus power diverted to Community Battery Storage.",
        extra: { gridEfficiency: 98.2, carbonSavedKg: 1420, activeBatteryDischarge: "0 kW (Charging)", offsetRevenue: "$240/hr" }
      },
      {
        label: "Cloud Cover Spike & EV Charging Rush (6:00 PM)",
        value: "Grid Status: 80 kW Solar Gen, 520 kW Demand. AI auto-triggers 440 kW battery discharge in 4ms.",
        extra: { gridEfficiency: 96.5, carbonSavedKg: 890, activeBatteryDischarge: "440 kW (Active)", offsetRevenue: "$180/hr" }
      },
      {
        label: "Severe Storm & Substation Trip Emergency",
        value: "Grid Status: Central Substation Down. ClimaGrid operates islanded microgrid mode automatically.",
        extra: { gridEfficiency: 92.0, carbonSavedKg: 2100, activeBatteryDischarge: "Isolating Grid Nodes", offsetRevenue: "Emergency Mode" }
      }
    ]
  },
  lexiguard: {
    id: "lexiguard",
    name: "LexiGuard Legal Contract Radar",
    tagline: "Real-Time Contract Risk Anomaly Detector",
    badge: "Future of Work & Legal",
    description: "Scans legal agreements for predatory non-compete clauses, unfair liability caps, and non-standard termination penalties.",
    accentColor: "rose",
    sampleInputs: [
      {
        label: "Predatory Freelance Master Services Agreement",
        value: "Contract Text: 'Contractor agrees that for 36 months following termination, Contractor shall not provide any software engineering services to any entity in North America...'",
        extra: { riskLevel: "CRITICAL (High Risk)", flaggedClauses: 4, primaryConcern: "Overbroad 3-Year Geographic Non-Compete", suggestedRewrite: "Limit non-compete to direct client competitors for 6 months within a 50-mile radius." }
      },
      {
        label: "Standard Tech Startup Employment Contract",
        value: "Contract Text: 'Employee assigns all IP created during employment hours utilizing company equipment to Startup Inc. Standard standard 4-year vesting with 1-year cliff.'",
        extra: { riskLevel: "LOW (Standard Terms)", flaggedClauses: 1, primaryConcern: "Standard IP Assignment Notice", suggestedRewrite: "Ensure personal side projects created on personal devices outside work hours are explicitly excluded." }
      },
      {
        label: "SaaS Vendor Enterprise Agreement with Uncapped Liability",
        value: "Contract Text: 'Customer agrees to indemnify, defend, and hold harmless Provider from any third-party claims without limitation or liability cap.'",
        extra: { riskLevel: "HIGH (Financial Trap)", flaggedClauses: 3, primaryConcern: "Uncapped Indemnification Clause", suggestedRewrite: "Cap total indemnity liability to 12 months of fees paid under this Agreement." }
      }
    ]
  }
};
