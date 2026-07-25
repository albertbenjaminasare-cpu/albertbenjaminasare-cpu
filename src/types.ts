export type ContestTrack = 
  | "AI & Agents" 
  | "Healthcare & Bio" 
  | "Climate & Sustainability" 
  | "FinTech & Web3" 
  | "Future of Work & DevTools" 
  | "Education & Accessibility" 
  | "Multimodal & Vision";

export interface RoadmapStep {
  hour: string;
  task: string;
}

export interface ProjectIdea {
  id: string;
  title: string;
  tagline: string;
  track: ContestTrack;
  noveltyScore: number; // e.g. 96/100
  wowFactor: string;
  problemStatement: string;
  solution: string;
  keyFeatures: string[];
  techStack: string[];
  demoScriptHook: string;
  roadmap: RoadmapStep[];
  hasLiveDemo?: boolean;
  demoId?: string;
}

export interface FeatureSuggestion {
  name: string;
  description: string;
  difficulty: "Easy" | "Medium" | "High";
}

export interface PitchPhase {
  timestamp: string;
  phase: string;
  script: string;
}

export interface JudgeQA {
  judgeType: string;
  question: string;
  winningAnswer: string;
}

export interface SuperchargedAnalysis {
  superchargedTitle: string;
  tagline: string;
  noveltyScore: number;
  technicalFeasibilityScore: number;
  contestWinnerAngle: string;
  magicDemoMoment: string;
  suggestedFeatures: FeatureSuggestion[];
  recommendedArchitecture: string[];
  pitchFlow: PitchPhase[];
  anticipatedJudgeQuestions: JudgeQA[];
}

export interface JudgeScoreBreakdown {
  innovation: number;
  technicalDepth: number;
  presentationClarity: number;
  feasibility: number;
}

export interface JudgeFeedback {
  judgeName: string;
  verdict: "Outstanding" | "Impressive" | "Promising" | "Critical Gap";
  scoreBreakdown: JudgeScoreBreakdown;
  overallScore: number;
  feedback: string;
  followUpQuestion: string;
  proTip: string;
}

export interface SlideItem {
  slideNumber: number;
  title: string;
  subtitle: string;
  bulletPoints: string[];
  visualIdea: string;
  speakerNote: string;
}

// AgriVision Specific Types
export interface DiseaseHotspot {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage
  height: number; // percentage
  label: string;
  severity: "High" | "Medium" | "Low";
}

export interface MultilingualAudioScript {
  twi: string;  // Ghanaian Asante Twi
  fat: string;  // Ghanaian Fante Mfantse
  ga: string;   // Ghanaian Gã / Garnett (Greater Accra)
  ee: string;   // Ghanaian Ewe (Volta region)
  ha: string;   // Hausa
  en: string;   // Ghanaian Extension English
  fr: string;   // French (Francophone West Africa)
}

export interface AgriVisionAnalysis {
  diseaseName: string;
  scientificName?: string;
  isHealthy: boolean;
  confidenceScore: number;
  severityLevel: string;
  affectedAreaPercent: number;
  cropCategory: string;
  primarySymptoms: string[];
  diseaseHotspots: DiseaseHotspot[];
  immediateOrganicRemedy: string;
  chemicalTreatment: string;
  yieldImpactPercent: number;
  estimatedEconomicLossPrevention: string;
  microclimateAdvisory: string;
  multilingualAudioScript: MultilingualAudioScript;
}

export interface CropSample {
  id: string;
  name: string;
  crop: string;
  condition: string;
  badge: string;
  imageUrl: string;
  description: string;
}

export interface ScanLogItem {
  id: string;
  timestamp: string;
  cropName: string;
  diseaseName: string;
  isHealthy: boolean;
  severity: string;
  confidence: number;
  location: string;
  imageUrl?: string;
}

