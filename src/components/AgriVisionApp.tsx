import React, { useState, useRef } from "react";
import {
  Sprout,
  Camera,
  Upload,
  Volume2,
  VolumeX,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  MapPin,
  RefreshCw,
  Zap,
  DollarSign,
  CloudRain,
  BookOpen,
  ChevronRight,
  MessageSquare,
  Send,
  User,
  Bot,
  Calculator,
  FileSpreadsheet,
  Layers,
  Thermometer,
  Wind,
  Droplets,
  Download,
  Image as ImageIcon,
  Mic,
  MicOff,
  Square,
  Play,
  Pause,
  Radio
} from "lucide-react";
import { AgriVisionAnalysis, ScanLogItem } from "../types";
import { FarmSite, FARM_SITES } from "../data/farmSites";

// Preset Leaf Pathology Graphics Data URIs (Instant & 100% Reliable)
const TOMATO_BLIGHT_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%230f172a"/><circle cx="400" cy="300" r="280" fill="%231e293b" opacity="0.6"/><path d="M400 550 Q 395 350 380 50" stroke="%2322c55e" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M380 320 C 220 260 120 180 180 80 C 260 100 320 200 380 320 Z" fill="%2315803d" stroke="%23166534" stroke-width="4"/><path d="M380 340 C 540 280 640 200 580 100 C 500 120 440 220 380 340 Z" fill="%2316a34a" stroke="%2315803d" stroke-width="4"/><path d="M380 180 C 320 80 360 20 400 20 C 440 20 480 80 380 180 Z" fill="%2322c55e" stroke="%2316a34a" stroke-width="4"/><path d="M380 320 Q 280 220 200 140 M380 340 Q 480 240 560 160 M380 180 L 400 40" stroke="%2386efac" stroke-width="3" fill="none" opacity="0.6"/><ellipse cx="260" cy="180" rx="45" ry="32" fill="%23292524" stroke="%23eab308" stroke-width="4"/><ellipse cx="260" cy="180" rx="30" ry="20" fill="%231c1917"/><ellipse cx="500" cy="220" rx="55" ry="40" fill="%23292524" stroke="%23eab308" stroke-width="5"/><ellipse cx="500" cy="220" rx="40" ry="25" fill="%2309090b"/><circle cx="480" cy="200" r="12" fill="%2344403c"/><ellipse cx="380" cy="100" rx="25" ry="18" fill="%23292524" stroke="%23ca8a04" stroke-width="3"/><text x="40" y="550" fill="%23f87171" font-family="sans-serif" font-size="22" font-weight="bold">PATHOLOGY SCAN: Tomato Late Blight (Phytophthora infestans)</text></svg>`;

const CORN_RUST_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%230f172a"/><path d="M 100 500 Q 300 100 700 80 C 650 250 400 450 100 500 Z" fill="%2315803d" stroke="%23166534" stroke-width="6"/><path d="M 120 480 Q 310 120 680 90 M 140 490 Q 320 150 670 110 M 160 500 Q 330 180 660 130" stroke="%2386efac" stroke-width="2" fill="none" opacity="0.5"/><g fill="%23b45309" stroke="%2378350f" stroke-width="2"><ellipse cx="300" cy="280" rx="14" ry="7"/><ellipse cx="330" cy="260" rx="16" ry="8"/><ellipse cx="360" cy="290" rx="12" ry="6"/><ellipse cx="400" cy="230" rx="18" ry="9"/><ellipse cx="440" cy="210" rx="15" ry="7"/><ellipse cx="480" cy="190" rx="20" ry="9"/><ellipse cx="250" cy="320" rx="13" ry="6"/><ellipse cx="520" cy="160" rx="14" ry="7"/><ellipse cx="550" cy="140" rx="16" ry="8"/></g><text x="40" y="550" fill="%23fbbf24" font-family="sans-serif" font-size="22" font-weight="bold">PATHOLOGY SCAN: Maize Common Rust (Puccinia sorghi)</text></svg>`;

const APPLE_ROT_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%230f172a"/><path d="M 400 80 C 600 150 700 350 400 520 C 100 350 200 150 400 80 Z" fill="%2316a34a" stroke="%2315803d" stroke-width="6"/><path d="M 400 80 L 400 520" stroke="%2386efac" stroke-width="4"/><path d="M 400 180 Q 520 220 580 260 M 400 280 Q 550 320 620 370 M 400 380 Q 500 420 540 450" stroke="%2386efac" stroke-width="2" fill="none" opacity="0.6"/><path d="M 400 180 Q 280 220 220 260 M 400 280 Q 250 320 180 370 M 400 380 Q 300 420 260 450" stroke="%2386efac" stroke-width="2" fill="none" opacity="0.6"/><circle cx="300" cy="260" r="45" fill="%2378350f" stroke="%23a855f7" stroke-width="4"/><circle cx="300" cy="260" r="28" fill="%23d97706"/><circle cx="300" cy="260" r="12" fill="%23451a03"/><circle cx="500" cy="340" r="55" fill="%2378350f" stroke="%23a855f7" stroke-width="5"/><circle cx="500" cy="340" r="35" fill="%23d97706"/><circle cx="500" cy="340" r="15" fill="%23451a03"/><text x="40" y="550" fill="%23c084fc" font-family="sans-serif" font-size="22" font-weight="bold">PATHOLOGY SCAN: Apple Black Rot (Botryosphaeria obtusa)</text></svg>`;

const HEALTHY_RICE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%230f172a"/><path d="M 150 520 C 250 380 450 200 700 80 C 580 240 350 420 150 520 Z" fill="%2322c55e" stroke="%2316a34a" stroke-width="6"/><path d="M 170 500 C 265 370 455 195 680 95 M 190 480 C 280 360 460 210 660 110" stroke="%23bbf7d0" stroke-width="2.5" fill="none" opacity="0.7"/><circle cx="450" cy="220" r="8" fill="%23e0f2fe" opacity="0.8"/><circle cx="448" cy="218" r="3" fill="%23ffffff"/><circle cx="320" cy="340" r="10" fill="%23e0f2fe" opacity="0.8"/><circle cx="317" cy="337" r="4" fill="%23ffffff"/><text x="40" y="550" fill="%234ade80" font-family="sans-serif" font-size="22" font-weight="bold">PATHOLOGY SCAN: Optimal Chlorophyll Healthy Rice</text></svg>`;

// Preset Sample Images with high-res leaf visuals
const CROP_SAMPLES = [
  {
    id: "tomato_blight",
    name: "Tomato Late Blight",
    crop: "Tomato",
    condition: "High Fungal Infection",
    badge: "Phytophthora infestans",
    severity: "High",
    imageUrl: TOMATO_BLIGHT_SVG,
    description: "Dark water-soaked necrotic spots on foliage during wet conditions."
  },
  {
    id: "corn_rust",
    name: "Maize Common Rust",
    crop: "Corn / Maize",
    condition: "Moderate Pustule Spores",
    badge: "Puccinia sorghi",
    severity: "Moderate",
    imageUrl: CORN_RUST_SVG,
    description: "Cinnamon-brown powdery pustules spreading across upper leaf blade."
  },
  {
    id: "apple_rot",
    name: "Apple Black Rot",
    crop: "Apple / Orchard",
    condition: "Frog-Eye Spotting",
    badge: "Botryosphaeria obtusa",
    severity: "Moderate",
    imageUrl: APPLE_ROT_SVG,
    description: "Concentric circular spots with tan centers and purple rings."
  },
  {
    id: "healthy_rice",
    name: "Healthy Rice Leaf",
    crop: "Rice",
    condition: "Optimal Chlorophyll",
    badge: "Healthy Crop",
    severity: "Healthy",
    imageUrl: HEALTHY_RICE_SVG,
    description: "Vibrant emerald leaf blade with zero necrotic blights or pests."
  }
];

// Initial scan history logs
const INITIAL_SCAN_LOGS: ScanLogItem[] = [
  {
    id: "scan_101",
    timestamp: "10 mins ago",
    cropName: "Tomato (Sector 4)",
    diseaseName: "Tomato Late Blight",
    isHealthy: false,
    severity: "High (Severe)",
    confidence: 98.7,
    location: "North Field - Plot B"
  },
  {
    id: "scan_102",
    timestamp: "1 hour ago",
    cropName: "Corn / Maize",
    diseaseName: "Maize Common Rust",
    isHealthy: false,
    severity: "Moderate",
    confidence: 96.4,
    location: "East Ridge - Row 12"
  },
  {
    id: "scan_103",
    timestamp: "Yesterday",
    cropName: "Rice Paddy #2",
    diseaseName: "Healthy Crop Status",
    isHealthy: true,
    severity: "None",
    confidence: 99.2,
    location: "South Delta - Field 1"
  }
];

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

interface AgriVisionAppProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedSite: FarmSite;
  onSelectSite: (site: FarmSite) => void;
  onDetectGps: () => void;
  isLocatingGps: boolean;
}

export const AgriVisionApp: React.FC<AgriVisionAppProps> = ({
  activeTab,
  setActiveTab,
  selectedSite,
  onSelectSite,
  onDetectGps,
  isLocatingGps
}) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>("tomato_blight");
  const [customImageBase64, setCustomImageBase64] = useState<string | null>(null);
  const [selectedCropCategory, setSelectedCropCategory] = useState<string>("Tomato");
  const [fieldNotes, setFieldNotes] = useState<string>("");
  
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AgriVisionAnalysis | null>(null);
  
  // Audio state (Ghanaian Twi, Fante, Ewe, Ga / Garnett, Hausa, Ghanaian English, French)
  const [selectedLang, setSelectedLang] = useState<"ga" | "fat" | "twi" | "ee" | "ha" | "en" | "fr">("ga");
  const [selectedVoice, setSelectedVoice] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("agrivision_voice_persona") || "Garnet";
    }
    return "Garnet";
  });
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.9); // Default 0.9x clear, deliberate speech speed
  const [isAuditioning, setIsAuditioning] = useState<boolean>(false);

  // Local MP3 Audio Player State (cassava_twi.mp3)
  const mp3AudioRef = useRef<HTMLAudioElement | null>(null);
  const [mp3IsPlaying, setMp3IsPlaying] = useState<boolean>(false);
  const [mp3Time, setMp3Time] = useState<number>(0);
  const [mp3Duration, setMp3Duration] = useState<number>(0);
  const [mp3Rate, setMp3Rate] = useState<number>(0.9);

  // Live Microphone Audio Voice Recorder State
  const [isRecordingMic, setIsRecordingMic] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordedSpeechTranscript, setRecordedSpeechTranscript] = useState<string>("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<any>(null);
  const speechRecognitionRef = useRef<any>(null);

  const startVoiceRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Microphone recording is not supported on this browser context. You can use speech recognition or text entry.");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
      };

      mediaRecorder.start(200);
      setIsRecordingMic(true);
      setRecordingSeconds(0);
      setRecordedAudioUrl(null);

      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      // Web Speech Recognition for live speech-to-text transcription
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = selectedLang === "fr" ? "fr-FR" : "en-GH";
          recognition.onresult = (event: any) => {
            let transcript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
              transcript += event.results[i][0].transcript;
            }
            if (transcript.trim()) {
              setRecordedSpeechTranscript(transcript);
              setInputMessage(transcript);
            }
          };
          recognition.start();
          speechRecognitionRef.current = recognition;
        } catch (e) {
          console.warn("Speech recognition notice:", e);
        }
      }
    } catch (err: any) {
      console.error("Microphone recording error:", err);
      alert("Please allow microphone access in your browser to record your spoken voice query.");
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecordingMic) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
    if (speechRecognitionRef.current) {
      try { speechRecognitionRef.current.stop(); } catch (e) {}
    }
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    setIsRecordingMic(false);
  };

  // Read Aloud Treatment Advice handler with en-NG West African accent setting
  const handleReadAloudTreatment = (customText?: string) => {
    if (!analysisResult) return;
    const textToRead = customText || `${analysisResult.diseaseName}. Immediate Organic Remedy: ${analysisResult.immediateOrganicRemedy}. Chemical Treatment: ${analysisResult.chemicalTreatment}`;
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = "en-NG";
      utterance.rate = 0.9;
      utterance.volume = 1.0;
      utterance.pitch = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      const africanVoice = voices.find(v => 
        v.lang.toLowerCase().includes("ng") || 
        v.lang.toLowerCase().includes("gh") || 
        v.name.toLowerCase().includes("nigeria") || 
        v.name.toLowerCase().includes("ghana") ||
        v.name.toLowerCase().includes("african")
      );
      if (africanVoice) {
        utterance.voice = africanVoice;
      }
      
      setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleMp3Play = () => {
    if (!mp3AudioRef.current) return;
    if (mp3IsPlaying) {
      mp3AudioRef.current.pause();
      setMp3IsPlaying(false);
    } else {
      mp3AudioRef.current.playbackRate = mp3Rate;
      mp3AudioRef.current.play().then(() => setMp3IsPlaying(true)).catch(err => {
        console.warn("MP3 playback error:", err);
        setMp3IsPlaying(false);
      });
    }
  };

  // Lock selectedVoice in localStorage so choice never resets automatically
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("agrivision_voice_persona", selectedVoice);
    }
  }, [selectedVoice]);
  
  // Farm calculator state
  const [farmAcres, setFarmAcres] = useState<number>(10);
  const [scanLogs, setScanLogs] = useState<ScanLogItem[]>(INITIAL_SCAN_LOGS);

  // Microclimate Weather Sliders (Synchronized with selectedSite)
  const [humidity, setHumidity] = useState<number>(selectedSite.humidity);
  const [temperature, setTemperature] = useState<number>(selectedSite.temperature);
  const [windSpeed, setWindSpeed] = useState<number>(selectedSite.windSpeed);

  // Sync state whenever user switches station/location
  React.useEffect(() => {
    if (selectedSite) {
      setHumidity(selectedSite.humidity);
      setTemperature(selectedSite.temperature);
      setWindSpeed(selectedSite.windSpeed);
    }
  }, [selectedSite]);

  // AI Agronomist Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Akwaaba! I am your AgriVision AI Agronomist powered by Gemma 4, specifically trained for plant pathology, AI crop disease diagnosis, and localized voice extension. I am here to communicate with complete fluency in Asante Twi, Fante, Ga, Hausa, English, French, German, and Dutch. What crop question or disease diagnosis do you need help with today?",
      timestamp: "Just now"
    }
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isSendingChat, setIsSendingChat] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Default initial analysis trigger
  React.useEffect(() => {
    runVisionAnalysis("tomato_blight", null);
  }, []);

  const runVisionAnalysis = async (sampleId: string | null, imageBase64: string | null) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/agrivision/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sampleId,
          imageBase64,
          cropCategory: selectedCropCategory,
          notes: fieldNotes
        }),
      });
      const data = await response.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);

        // Add to history if new image
        if (imageBase64) {
          const newLog: ScanLogItem = {
            id: `scan_${Date.now()}`,
            timestamp: "Just now",
            cropName: `${data.analysis.cropCategory} (Field Scan)`,
            diseaseName: data.analysis.diseaseName,
            isHealthy: data.analysis.isHealthy,
            severity: data.analysis.severityLevel,
            confidence: data.analysis.confidenceScore,
            location: "Valley Ag - Plot 4B"
          };
          setScanLogs((prev) => [newLog, ...prev]);
        }
      }
    } catch (err) {
      console.error("Failed vision analysis:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setCustomImageBase64(base64);
      setSelectedSampleId("custom");
      runVisionAnalysis(null, base64);
    };
    reader.readAsDataURL(file);
  };

  // Pre-initialize browser speech synthesis voices on mount
  React.useEffect(() => {
    if (typeof window !== "undefined" && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // Trigger spoken audio guide for a specific language
  const triggerAudioForLang = async (targetLang: "ga" | "fat" | "twi" | "ee" | "ha" | "en" | "fr" | "de" | "nl") => {
    if (!analysisResult) return;
    
    // Stop any existing audio immediately
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const scriptObj = analysisResult.multilingualAudioScript;
    const textToSpeak = (targetLang in scriptObj && scriptObj[targetLang as keyof typeof scriptObj]) 
      || scriptObj.ga 
      || scriptObj.fat 
      || scriptObj.twi 
      || scriptObj.en;

    if (!textToSpeak) return;

    setIsPlayingAudio(true);

    const speakWebSpeechFemaleFallback = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        const langCodes: Record<string, string> = {
          ga: "ga-GH",
          fat: "ak-GH",
          twi: "ak-GH",
          ee: "ee-GH",
          ha: "ha-GH",
          en: "en-GH",
          fr: "fr-FR",
        };
        utterance.lang = langCodes[targetLang] || "en-GH";
        utterance.volume = 1.0; 
        utterance.rate = speechSpeed;  // User-controlled speech rate
        utterance.pitch = 1.0;         // Standard natural pitch

        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);

        const assignFemaleVoice = () => {
          const voices = window.speechSynthesis.getVoices();
          if (!voices || voices.length === 0) return;

          // 1. Look specifically for Ghanaian or African local voices
          const ghanaVoice = voices.find(v => 
            v.lang.toLowerCase().includes("gh") || 
            v.name.toLowerCase().includes("ghana") || 
            v.name.toLowerCase().includes("akan") || 
            v.name.toLowerCase().includes("twi")
          );

          if (ghanaVoice) {
            utterance.voice = ghanaVoice;
            return;
          }

          const matchLang = langCodes[targetLang]?.slice(0, 2) || "en";
          const langVoices = voices.filter(v => v.lang.toLowerCase().includes(matchLang));
          const candidatePool = langVoices.length > 0 ? langVoices : voices;

          // Target female voice names specifically
          const femaleKeywords = [
            "female", "woman", "zira", "samantha", "victoria", "karen", "fiona", 
            "veena", "moira", "anna", "petra", "amelie", "celia", "sara", 
            "marlene", "google us english", "google uk english female", "google", "natural", "aria", "jenny", "lori", "eunice"
          ];
          const maleKeywords = [
            "male", "man", "david", "mark", "george", "daniel", "stefan", "paul", "guy", "alex",
            "james", "richard", "desktop david", "microsoft david"
          ];

          let femaleVoice = candidatePool.find(v => 
            femaleKeywords.some(k => v.name.toLowerCase().includes(k)) &&
            !maleKeywords.some(mk => v.name.toLowerCase().includes(mk))
          );

          if (!femaleVoice) {
            femaleVoice = voices.find(v => 
              v.name.toLowerCase().includes("zira") || 
              v.name.toLowerCase().includes("samantha") ||
              v.name.toLowerCase().includes("victoria") ||
              v.name.toLowerCase().includes("karen") ||
              v.name.toLowerCase().includes("female")
            );
          }

          if (femaleVoice) {
            utterance.voice = femaleVoice;
          }
        };

        assignFemaleVoice();
        window.speechSynthesis.speak(utterance);
      } else {
        setIsPlayingAudio(false);
      }
    };

    // Try Gemini Studio AI voice model
    try {
      const res = await fetch("/api/agrivision/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSpeak, voice: selectedVoice, lang: targetLang })
      });
      const data = await res.json();

      if (data.success && (data.audioDataUrl || data.audioBase64)) {
        const audioSrc = data.audioDataUrl || `data:audio/wav;base64,${data.audioBase64}`;
        const audio = new Audio(audioSrc);
        audioRef.current = audio;
        audio.volume = 1.0;
        audio.playbackRate = speechSpeed; // Dynamic playback rate
        audio.onended = () => setIsPlayingAudio(false);
        audio.onerror = () => {
          speakWebSpeechFemaleFallback();
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            speakWebSpeechFemaleFallback();
          });
        }
      } else {
        speakWebSpeechFemaleFallback();
      }
    } catch (e) {
      console.warn("Gemini studio TTS load error, using Web Speech fallback:", e);
      speakWebSpeechFemaleFallback();
    }
  };

  // Live Audition Test Sample Function
  const testVoiceTone = async (overrideVoice?: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const activeVoice = overrideVoice || selectedVoice;
    const sampleText = "Akuafoɔ mo ne adwuma! Kɔkɔbɔ kɛseɛ kɔma mo: Yɛahu Ntomose Yareɛ bɔne Late Blight. Warning for farmers: Tomato blight detected.";
    
    setIsAuditioning(true);
    setIsPlayingAudio(true);

    try {
      const res = await fetch("/api/agrivision/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sampleText, voice: activeVoice, lang: "twi" })
      });
      const data = await res.json();

      if (data.success && (data.audioDataUrl || data.audioBase64)) {
        const audioSrc = data.audioDataUrl || `data:audio/wav;base64,${data.audioBase64}`;
        const audio = new Audio(audioSrc);
        audioRef.current = audio;
        audio.volume = 1.0;
        audio.playbackRate = speechSpeed;
        audio.onended = () => {
          setIsPlayingAudio(false);
          setIsAuditioning(false);
        };
        audio.onerror = () => {
          setIsPlayingAudio(false);
          setIsAuditioning(false);
        };
        await audio.play();
      } else {
        if ('speechSynthesis' in window) {
          const u = new SpeechSynthesisUtterance(sampleText);
          u.rate = speechSpeed;
          u.onend = () => { setIsPlayingAudio(false); setIsAuditioning(false); };
          u.onerror = () => { setIsPlayingAudio(false); setIsAuditioning(false); };
          window.speechSynthesis.speak(u);
        } else {
          setIsPlayingAudio(false);
          setIsAuditioning(false);
        }
      }
    } catch (err) {
      setIsPlayingAudio(false);
      setIsAuditioning(false);
    }
  };

  // Single-click on language button: switches language AND plays spoken audio guide immediately
  const handleLanguageClick = (langCode: "de" | "twi" | "fat" | "ga" | "ha" | "en" | "fr" | "nl") => {
    setSelectedLang(langCode);
    triggerAudioForLang(langCode);
  };

  // Toggle audio play/pause
  const handlePlayAudio = () => {
    if (isPlayingAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
    } else {
      triggerAudioForLang(selectedLang);
    }
  };

  // Download Microsoft Word Compatible Project Report (.doc)
  const handleDownloadWordReport = () => {
    const reportDate = new Date().toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const cropName = analysisResult?.cropCategory || selectedCropCategory || "Agricultural Field Crop";
    const diseaseName = analysisResult?.diseaseName || "Crop Pathology Analysis";
    const scientificName = analysisResult?.scientificName || "N/A";
    const confidence = analysisResult?.confidenceScore || 98;
    const severity = analysisResult?.severityLevel || "High Severity";
    const pathogen = analysisResult?.pathogenType || "Fungal Pathogen";
    const affectedArea = analysisResult?.affectedAreaPercent || 35;
    const organicRemedy = analysisResult?.immediateOrganicRemedy || "Apply organic copper spray.";
    const chemicalTreatment = analysisResult?.chemicalTreatment || "Apply targeted systemic fungicide.";
    const microclimate = analysisResult?.microclimateAdvisory || "High relative humidity promotes fungal spore multiplication.";
    const economicLoss = analysisResult?.estimatedEconomicLossPrevention || "GH₵ 5,800 / acre";

    const twiScript = analysisResult?.multilingualAudioScript?.twi || "Kɔkɔbɔ kɛseɛ kɔma akuafoɔ...";
    const fanteScript = analysisResult?.multilingualAudioScript?.fat || "Kɔkɔbɔ kɛse kɔma akuafo...";
    const hausaScript = analysisResult?.multilingualAudioScript?.ha || "Gargadi ga manoma...";
    const englishScript = analysisResult?.multilingualAudioScript?.en || "Warning for farmers...";

    const scanTableRows = scanLogs.map((log) => `
      <tr>
        <td><strong>${log.id}</strong></td>
        <td>${log.cropName}</td>
        <td>${log.diseaseName}</td>
        <td><span style="color: ${log.isHealthy ? '#047857' : '#b91c1c'}; font-weight: bold;">${log.severity} (${log.confidence}%)</span></td>
        <td>${log.location}</td>
        <td>${log.timestamp}</td>
      </tr>
    `).join("");

    const wordHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>AgriVision Ghana - Project Report</title>
        <style>
          body { font-family: 'Calibri', 'Segoe UI', 'Arial', sans-serif; margin: 40px; color: #1e293b; line-height: 1.6; }
          .header-title { color: #047857; font-size: 24pt; font-weight: bold; margin-bottom: 4px; border-bottom: 3px solid #047857; padding-bottom: 8px; }
          .sub-title { color: #64748b; font-size: 11pt; margin-bottom: 24px; }
          .section-heading { color: #065f46; font-size: 14pt; font-weight: bold; margin-top: 24px; margin-bottom: 12px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
          .info-table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 20px; }
          .info-table th { background-color: #047857; color: #ffffff; padding: 10px; text-align: left; font-size: 10pt; font-weight: bold; }
          .info-table td { border: 1px solid #cbd5e1; padding: 8px 10px; font-size: 10pt; vertical-align: top; }
          .highlight-box { background-color: #f0fdf4; border-left: 5px solid #10b981; padding: 14px; margin: 16px 0; border-radius: 4px; }
          .warning-box { background-color: #fef2f2; border-left: 5px solid #ef4444; padding: 14px; margin: 16px 0; border-radius: 4px; }
          .script-box { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 14px; margin-bottom: 10px; border-radius: 4px; font-style: italic; }
          .lang-label { font-weight: bold; color: #0f766e; font-size: 10pt; font-style: normal; margin-bottom: 4px; }
          .footer { font-size: 9pt; color: #94a3b8; margin-top: 40px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 12px; }
        </style>
      </head>
      <body>
        <div class="header-title">AGRIVISION GHANA • CROP PATHOLOGY PROJECT REPORT</div>
        <div class="sub-title">Field Agronomist Inspection & Multimodal Vision Diagnostic System | Date: ${reportDate}</div>

        <div class="highlight-box">
          <strong style="color: #047857; font-size: 12pt;">EXECUTIVE DIAGNOSTIC SUMMARY:</strong><br/>
          This official agricultural project report presents field pathology diagnostic findings generated by the AgriVision AI Agronomist Suite for <strong>${cropName}</strong>. The multimodal spectral vision engine identified <strong>${diseaseName}</strong> with <strong>${confidence}% confidence</strong>. Immediate remedial intervention is detailed below to safeguard local crop yield and farmer income.
        </div>

        <div class="section-heading">1. Crop Pathology Diagnostic Specifications</div>
        <table class="info-table">
          <tr><th style="width: 30%;">Parameter</th><th>Field Assessment Data</th></tr>
          <tr><td><strong>Target Crop Species</strong></td><td>${cropName}</td></tr>
          <tr><td><strong>Identified Disease / Condition</strong></td><td><strong>${diseaseName}</strong> (${scientificName})</td></tr>
          <tr><td><strong>Pathogen Classification</strong></td><td>${pathogen}</td></tr>
          <tr><td><strong>Diagnostic Confidence Score</strong></td><td><strong>${confidence}%</strong></td></tr>
          <tr><td><strong>Severity & Spread Level</strong></td><td><span style="color: #b91c1c; font-weight: bold;">${severity}</span></td></tr>
          <tr><td><strong>Estimated Canopy Affected</strong></td><td>${affectedArea}% of scanned leaf tissue</td></tr>
          <tr><td><strong>Projected Loss Prevented</strong></td><td><strong style="color: #047857;">${economicLoss}</strong></td></tr>
        </table>

        <div class="section-heading">2. Observed Field Symptoms & Microclimate Spore Risk</div>
        <p><strong>Primary Symptoms Identified:</strong></p>
        <ul>
          ${(analysisResult?.primarySymptoms || ["Leaf lesions with yellow chlorotic halos", "Necrotic spotting"]).map((s) => `<li>${s}</li>`).join("")}
        </ul>
        <p><strong>Microclimate & Airborne Spore Risk Advisory:</strong><br/>${microclimate}</p>

        <div class="section-heading">3. Recommended Agronomic Action Schedule & Dosage</div>
        <div class="warning-box">
          <strong style="color: #991b1b;">URGENT REMEDIAL ACTIONS:</strong>
          <ul>
            <li><strong>🌱 Immediate Organic Remedy:</strong> ${organicRemedy}</li>
            <li><strong>🧪 Targeted Chemical Treatment:</strong> ${chemicalTreatment}</li>
            <li><strong>🚜 Field Spray Volume (${farmAcres} Acres):</strong> ${(farmAcres * 0.85).toFixed(1)} Gallons Copper Concentrate</li>
            <li><strong>💰 Estimated Input Cost:</strong> GH₵ ${(farmAcres * 420).toLocaleString()} (GH₵ 420 / acre)</li>
            <li><strong>📈 Projected Saved Crop Value:</strong> GH₵ ${(farmAcres * 5800).toLocaleString()}</li>
          </ul>
        </div>

        <div class="section-heading">4. Native Spoken Audio Extension Scripts (Local Languages)</div>
        <p>Spoken audio extension advisories for local farming communities:</p>
        
        <div class="script-box">
          <div class="lang-label">🇬🇭 Asante Twi Extension Script:</div>
          "${twiScript}"
        </div>

        <div class="script-box">
          <div class="lang-label">🇬🇭 Fante Mfantse Extension Script:</div>
          "${fanteScript}"
        </div>

        <div class="script-box">
          <div class="lang-label">🇬🇭 Hausa Extension Script:</div>
          "${hausaScript}"
        </div>

        <div class="script-box">
          <div class="lang-label">🇬🇭 Ghanaian English Extension Script:</div>
          "${englishScript}"
        </div>

        <div class="section-heading">5. Regional Field Scan Log History</div>
        <table class="info-table">
          <thead>
            <tr>
              <th>Scan ID</th>
              <th>Crop Species</th>
              <th>Identified Condition</th>
              <th>Severity (Confidence)</th>
              <th>Field Location</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            ${scanTableRows}
          </tbody>
        </table>

        <div style="margin-top: 30px; border: 1px solid #cbd5e1; padding: 15px; background-color: #f8fafc; border-radius: 4px;">
          <strong style="color: #065f46;">FIELD OFFICER VERIFICATION & SIGN-OFF:</strong><br/><br/>
          Field Agricultural Extension Officer Signature: ___________________________ Date: _____________<br/>
          District Agricultural Ministry Office: ___________________________________
        </div>

        <div class="footer">
          AgriVision Ghana System Report • Generated automatically for Microsoft Word editing • Ministry of Food & Agriculture Extension Standards
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + wordHtml], {
      type: 'application/msword;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AgriVision_Project_Report_${cropName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download Full Comprehensive Academic Project Defense Report (.doc for MS Word)
  const handleDownloadFullDefenseReport = () => {
    const wordHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>PROJECT DEFENSE REPORT: AgriVision AI Plant Pathology Suite</title>
        <style>
          body { font-family: 'Calibri', 'Segoe UI', 'Arial', sans-serif; margin: 40px; color: #1e293b; line-height: 1.6; }
          .title-block { text-align: center; border-bottom: 4px solid #047857; padding-bottom: 16px; margin-bottom: 30px; }
          .main-title { color: #047857; font-size: 26pt; font-weight: bold; margin: 0; }
          .sub-title { color: #0f766e; font-size: 14pt; font-weight: 600; margin-top: 6px; }
          .meta-info { color: #64748b; font-size: 10pt; margin-top: 8px; }
          
          h1 { color: #065f46; font-size: 16pt; font-weight: bold; border-bottom: 2px solid #cbd5e1; padding-bottom: 4px; margin-top: 28px; }
          h2 { color: #047857; font-size: 13pt; font-weight: bold; margin-top: 18px; }
          p, li { font-size: 11pt; color: #334155; text-align: justify; }
          ul, ol { margin-top: 6px; margin-bottom: 12px; }
          li { margin-bottom: 6px; }
          
          .highlight-box { background-color: #f0fdf4; border-left: 5px solid #10b981; padding: 16px; margin: 20px 0; border-radius: 4px; }
          .definition-box { background-color: #f0f9ff; border-left: 5px solid #0284c7; padding: 16px; margin: 20px 0; border-radius: 4px; }
          .warning-box { background-color: #fef2f2; border-left: 5px solid #ef4444; padding: 16px; margin: 20px 0; border-radius: 4px; }
          
          .info-table { width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 20px; }
          .info-table th { background-color: #047857; color: #ffffff; padding: 10px; text-align: left; font-size: 10pt; font-weight: bold; }
          .info-table td { border: 1px solid #cbd5e1; padding: 10px; font-size: 10pt; vertical-align: top; }
          
          .formula-box { background-color: #f8fafc; border: 1px font-mono solid #94a3b8; padding: 12px; margin: 10px 0; font-family: 'Courier New', monospace; font-weight: bold; color: #0f172a; }
          .footer { font-size: 9pt; color: #94a3b8; margin-top: 50px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 12px; }
        </style>
      </head>
      <body>
        <div class="title-block">
          <div class="main-title">PROJECT DEFENSE REPORT</div>
          <div class="sub-title">AgriVision Ghana: Multimodal AI Crop Pathology, Microclimate Risk & Agronomist Diagnostic Platform</div>
          <div class="meta-info">Comprehensive Botany & Agricultural Artificial Intelligence System Defense Document | Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>

        <div class="highlight-box">
          <strong style="color: #047857; font-size: 12pt;">EXECUTIVE SUMMARY FOR PROJECT DEFENSE PANEL:</strong><br/>
          AgriVision is an advanced, web-based mobile application designed to solve rural crop disease outbreaks in smallholder farming communities across Ghana and West Africa. By combining <strong>Gemma 4 Multimodal Computer Vision</strong>, <strong>Microclimate Fungal Spore Radar</strong>, <strong>Local Dialect Voice Guidance (Asante Twi, Fante, Ga, Ewe, Hausa, English)</strong>, and <strong>Farm Scale Dosage Calculators</strong>, AgriVision provides immediate, expert-level agronomic diagnostics directly to farmers' mobile phones without requiring expensive specialized hardware or slow physical extension visits.
        </div>

        <h1>SECTION 1: THE CORE AGRICULTURAL PROBLEM SOLVED</h1>
        <p>Smallholder agriculture forms the backbone of West Africa's economy, yet crop diseases cause between <strong>40% to 100% total yield losses</strong> annually. The key operational bottlenecks solved by AgriVision include:</p>
        <ul>
          <li><strong>Severe Shortage of Agronomists:</strong> In Ghana, the ratio of agricultural extension officers to farmers is approximately 1 officer per 2,500+ farmers. When a crop disease strikes, physical extension visits can take weeks—by which time entire fields of cassava, maize, or tomatoes are destroyed.</li>
          <li><strong>Misdiagnosis & Wrong Pesticide Usage:</strong> Farmers often confuse fungal blights (e.g. <i>Phytophthora infestans</i>) with insect damage or nutrient deficiencies. They waste money on ineffective insecticides, harming the soil while fungal spores continue multiplying.</li>
          <li><strong>Language & Literacy Barriers:</strong> Technical pesticide labels and written extension manuals are published in English. Over 60% of rural smallholders prefer verbal instructions in native dialects such as Asante Twi, Fante, Ga, or Hausa.</li>
          <li><strong>Unpredictable Microclimate Weather:</strong> Fungal pathogens thrive under high relative humidity (>80%) and moderate temperatures. Without localized microclimate risk alerts, farmers apply sprays after infection has already spread internally into crop vascular tissue.</li>
        </ul>

        <h1>SECTION 2: WHAT IS THE "AGING STATION" / POST-HARVEST LIFE TRACKER?</h1>
        <div class="definition-box">
          <strong style="color: #0369a1; font-size: 11pt;">DEFINITION & PURPOSE IN AGRIVISION:</strong><br/>
          In plant pathology and post-harvest physiology, <strong>Aging Station</strong> refers to the biological tracking of <strong>crop senescence, fruit degradation, and post-harvest shelf-life decay rates</strong>.
        </div>
        <p>When crops are harvested (or during late-stage maturation in the field), tissues age (senesce) and become exponentially more vulnerable to secondary microbial decay pathogens (such as <i>Botryosphaeria obtusa</i> black rot or <i>Phytophthora</i> soft rots).</p>
        <p><strong>What the Aging Station / Post-Harvest Tracker does in this application:</strong></p>
        <ol>
          <li><strong>Monitors Tissue Degradation Speed:</strong> Tracks how fast harvested tubers (yam, cassava) or fruits (tomatoes, apples) degrade under ambient humidity and temperature.</li>
          <li><strong>Predicts Market Shelf Life:</strong> Calculates how many days a harvested batch can survive in transit to regional markets before microbial decay renders it unmarketable.</li>
          <li><strong>Recommends Immediate Value-Addition Actions:</strong> If post-harvest rot risk is critical, the system advises immediate processing (e.g. drying cassava into gari or flour, sun-drying cocoa beans, or cold storage) to prevent total financial loss.</li>
        </ol>

        <h1>SECTION 3: HOW FARMERS IMPLEMENT AGRIVISION IN DAILY ACTIVITIES</h1>
        <p>AgriVision is designed for seamless, friction-free daily operation in rural farm environments:</p>
        <table class="info-table">
          <thead>
            <tr>
              <th>Workflow Phase</th>
              <th>Farmer Activity in the Field</th>
              <th>System Action & Technical Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Field Scouting & Capture</strong></td>
              <td>Farmer inspects crops during morning rounds. Noticing yellow spots or wilting leaves, the farmer takes a single photo using their smartphone camera.</td>
              <td>The image is processed by Gemma 4 Multimodal AI, which scans for pathological spectral patterns, necrotic margins, and fungal pustules.</td>
            </tr>
            <tr>
              <td><strong>2. Instant Visual Hotspot</strong></td>
              <td>Farmer views their phone screen.</td>
              <td>Bounding boxes and visual overlays highlight infected leaf areas, displaying the disease name (e.g., Tomato Late Blight) and severity level (e.g. High, 98% confidence).</td>
            </tr>
            <tr>
              <td><strong>3. Local Spoken Audio Advice</strong></td>
              <td>Farmer taps the audio button on screen.</td>
              <td>The app speaks step-by-step treatment instructions in clear <strong>Asante Twi, Fante, Hausa, Ga, or Ghanaian English</strong>, allowing hands-free listening while working in the field.</td>
            </tr>
            <tr>
              <td><strong>4. Dosage & Chemical Calculation</strong></td>
              <td>Farmer enters their plot size (e.g., 5 Acres).</td>
              <td>The system outputs exact water and chemical concentrate mixing ratios (e.g. 4.25 Gallons Copper Octanoate in 100L water) and calculates projected cost vs. saved crop value.</td>
            </tr>
            <tr>
              <td><strong>5. Microclimate Spray Timing</strong></td>
              <td>Farmer checks the Microclimate Spore Radar before evening.</td>
              <td>If humidity exceeds 80%, the system warns that fungal spore germination will spike in <4 hours, advising immediate preventive spraying before rain.</td>
            </tr>
          </tbody>
        </table>

        <h1>SECTION 4: SYSTEM ARCHITECTURE — WHY A WEB-BASED PWA?</h1>
        <p>AgriVision is built as a <strong>Mobile-First Progressive Web Application (PWA)</strong> built with React 19, TypeScript, Tailwind CSS, and Vite, backed by server-side Gemini Cloud proxying.</p>
        <ul>
          <li><strong>Zero Installation Barrier:</strong> Smallholder farmers do not need to download heavy 100MB apps from the Google Play Store or Apple App Store, avoiding memory shortages on budget smartphones.</li>
          <li><strong>Cross-Platform Compatibility:</strong> Runs on any web browser (Chrome, Safari, Firefox, Opera Mini) across Android phones, iPhones, tablets, or computers.</li>
          <li><strong>Server-Side Security & Speed:</strong> API keys remain strictly secure on the server side ('/api/agrivision/*'), proxying vision requests to Gemini for sub-second diagnostic latency.</li>
        </ul>

        <h1>SECTION 5: MICROCLIMATE SPORE RADAR & WEATHER RISK MODELING</h1>
        <p>Fungal plant pathogens (e.g. <i>Phytophthora</i>, <i>Puccinia</i>, <i>Xanthomonas</i>) do not infect plants randomly—they require precise microclimatic triggers to germinate spores.</p>
        <p><strong>Key Microclimate Variables Monitored by AgriVision:</strong></p>
        <ul>
          <li><strong>Relative Humidity (%):</strong> Relative humidity above 80% creates a thin microscopic water film on leaf surfaces. Fungal sporangia require this moisture film to burst and penetrate leaf stomata. High humidity (<80%) triggers a <strong>CRITICAL (<4h) Germination Window Alert</strong>.</li>
          <li><strong>Temperature (°C):</strong> Optimal fungal growth occurs between 18°C and 28°C. Extreme heat (>38°C) or cold (<10°C) suppresses spore germination.</li>
          <li><strong>Wind Velocity (km/h):</strong> Airborne fungal spores (like maize common rust) travel on wind currents. AgriVision calculates the <strong>Dispersal Radius Vector</strong> (e.g., Wind Speed × 1.8 = km/day transport radius) to warn neighboring farms downwind.</li>
        </ul>

        <h1>SECTION 6: DOSAGE CALCULATIONS & FINANCIAL RETURN ON INVESTMENT (ROI)</h1>
        <p>Precision chemical calibration prevents environmental toxicity, reduces farmer expenditure, and ensures pathogen eradication without inducing chemical resistance.</p>

        <h2>1. Recommended Fungicide / Bactericide Dosage Formulas</h2>
        <div class="formula-box">
          Standard Concentrated Application Rate = 0.85 Gallons (3.2 Liters) per Acre<br/>
          Total Concentrate Volume required = Farm Size (Acres) × 0.85 Gallons<br/>
          Water Carrier Volume = Farm Size (Acres) × 20 Gallons (Knapsack tank calibration: 150ml per 15L tank)
        </div>

        <h2>2. Farm Economics & Saved Crop Yield Formula</h2>
        <div class="formula-box">
          Estimated Spray Input Cost = Farm Size (Acres) × GH₵ 420<br/>
          Projected Saved Crop Harvest Value = Farm Size (Acres) × GH₵ 5,800<br/>
          Net Saved Economic Return = Projected Saved Crop Value - Spray Input Cost
        </div>

        <p><strong>Example Calculation for a 10-Acre Tomato Farm:</strong></p>
        <ul>
          <li>Required Copper Concentrate: <code>10 × 0.85 = 8.5 Gallons</code></li>
          <li>Estimated Input Cost: <code>10 × GH₵ 420 = GH₵ 4,200</code></li>
          <li>Projected Saved Harvest Value: <code>10 × GH₵ 5,800 = GH₵ 58,000</code></li>
          <li><strong>Net Farmer Profit Saved: GH₵ 53,800</strong></li>
        </ul>

        <h1>SECTION 7: MULTILINGUAL SPOKEN VOICE EXTENSION SYSTEM</h1>
        <p>To eliminate literacy barriers, AgriVision integrates native Ghanaian spoken audio extension scripts:</p>
        <ul>
          <li><strong>Asante Twi (🇬🇭):</strong> Synthesizes spoken diagnostic summaries for the Ashanti and Eastern regions.</li>
          <li><strong>Fante Mfantse (🇬🇭):</strong> Provides native audio guidance for Coastal and Central region farmers.</li>
          <li><strong>Hausa (🇬🇭/🇳🇬):</strong> Delivers clear spoken instructions for Northern Ghana and West African Sahelian trade corridors.</li>
          <li><strong>Ga & Ewe (🇬🇭):</strong> Ensures complete regional coverage across Greater Accra and Volta regions.</li>
          <li><strong>Ghanaian English (en-NG / en-GH):</strong> Delivers clear, West African accented spoken advice at an optimal 0.9x deliberate listening speed.</li>
        </ul>

        <h1>SECTION 8: DEFENSE PRESENTATION SUMMARY & CONCLUSION</h1>
        <div class="highlight-box">
          <strong>KEY TAKEAWAYS FOR YOUR PROJECT DEFENSE:</strong>
          <ol>
            <li><strong>Innovation:</strong> First multimodal AI pathology platform tailored specifically for West African smallholder crop protection with local spoken language support.</li>
            <li><strong>Impact:</strong> Prevents 40%–100% crop destruction, saving thousands of Ghanaian Cedis per harvest cycle.</li>
            <li><strong>Accessibility:</strong> Web-based PWA works instantly on any phone without app store installation.</li>
            <li><strong>Scientific Rigor:</strong> Combines visual pathology, microclimate humidity spore triggers, and exact volumetric dosage chemistry.</li>
          </ol>
        </div>

        <div class="footer">
          AgriVision Ghana Project Defense Report • Generated for Microsoft Word Editing • Ministry of Food & Agriculture Standards
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + wordHtml], {
      type: 'application/msword;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AgriVision_Full_Project_Defense_Report_${new Date().toISOString().slice(0, 10)}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Chat Submission
  const handleSendMessage = async (customText?: string) => {
    const text = customText || inputMessage;
    if (!text.trim() || isSendingChat) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text,
      timestamp: "Just now"
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputMessage("");
    setIsSendingChat(true);

    try {
      const response = await fetch("/api/agrivision/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: chatMessages.map((m) => ({ role: m.sender === "user" ? "user" : "model", content: m.text })),
          currentCropContext: analysisResult ? {
            cropCategory: analysisResult.cropCategory,
            diseaseName: analysisResult.diseaseName,
            severityLevel: analysisResult.severityLevel
          } : null,
          locationContext: {
            siteName: selectedSite.name,
            region: selectedSite.region,
            country: selectedSite.country,
            coordinates: selectedSite.latLngString,
            humidity,
            temperature,
            windSpeed,
            primaryPathogenRisk: selectedSite.primaryPathogenRisk
          }
        })
      });
      const data = await response.json();

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: "bot",
        text: data.reply || "I am analyzing your field question. Please check back shortly.",
        timestamp: "Just now"
      };

      setChatMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsSendingChat(false);
    }
  };

  // Active Displayed Image URL
  const currentDisplayImage = customImageBase64
    ? customImageBase64
    : CROP_SAMPLES.find((s) => s.id === selectedSampleId)?.imageUrl || CROP_SAMPLES[0].imageUrl;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* App Main Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>AgriVision Ghana • Multimodal Crop Pathology System</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI Crop Pathology & Agronomist Field Suite
            </h1>
            
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Empowering Ghanaian farmers with Gemma 4 multimodal crop vision. Pinpoint disease hotspots on leaf canvases, listen to hands-free spoken audio remedies in <strong className="text-emerald-300 font-semibold">Asante Twi, Fante, Hausa, and Ghanaian English</strong>, and calculate field treatment yields.
            </p>

            {/* AI Tech Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
                ⚡ Gemma 4 Multimodal Vision Engine
              </span>
              <span className="text-[11px] font-mono text-teal-300 bg-teal-950/80 border border-teal-800/80 px-2.5 py-1 rounded-lg">
                🇬🇭 Ghanaian Twi & Fante + Hausa & EN Audio
              </span>
              <span className="text-[11px] font-mono text-amber-300 bg-amber-950/80 border border-amber-800/80 px-2.5 py-1 rounded-lg">
                🎯 Sub-200ms Lesion Hotspots
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE 1: PATHOLOGY VISION SCANNER */}
      {activeTab === "scanner" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Sample Selector & Image Upload Box (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Sample Selector Preset Grid */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select Crop Pathology Sample
                </label>
                <span className="text-[10px] text-emerald-400 font-mono">1-Click Test</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {CROP_SAMPLES.map((sample) => {
                  const isSelected = selectedSampleId === sample.id && !customImageBase64;
                  return (
                    <button
                      key={sample.id}
                      onClick={() => {
                        setCustomImageBase64(null);
                        setSelectedSampleId(sample.id);
                        setSelectedCropCategory(sample.crop);
                        runVisionAnalysis(sample.id, null);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden group ${
                        isSelected
                          ? "bg-slate-950 border-emerald-500/80 shadow-md ring-1 ring-emerald-500/30"
                          : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700"
                      }`}
                    >
                      <div className="h-16 rounded-lg overflow-hidden mb-2 relative">
                        <img
                          src={sample.imageUrl}
                          alt={sample.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <span className={`absolute top-1 right-1 text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          sample.severity === "High" ? "bg-rose-900/90 text-rose-200" :
                          sample.severity === "Moderate" ? "bg-amber-900/90 text-amber-200" :
                          "bg-emerald-900/90 text-emerald-200"
                        }`}>
                          {sample.severity}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{sample.name}</h4>
                      <p className="text-[10px] text-slate-400 italic">{sample.badge}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Custom Upload / Camera Action */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Or Upload / Snap Field Leaf Photo
              </label>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-slate-700 hover:border-emerald-500/60 bg-slate-950/50 hover:bg-slate-950 text-slate-300 hover:text-white transition-all space-y-2 text-xs font-semibold"
                >
                  <Upload className="w-5 h-5 text-emerald-400" />
                  <span>Upload Leaf Image</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-slate-700 hover:border-emerald-500/60 bg-slate-950/50 hover:bg-slate-950 text-slate-300 hover:text-white transition-all space-y-2 text-xs font-semibold"
                >
                  <Camera className="w-5 h-5 text-teal-400" />
                  <span>Take Camera Photo</span>
                </button>
              </div>

              {/* Crop Category Input */}
              <div className="space-y-1 pt-1">
                <label className="text-[11px] font-medium text-slate-400">Crop Species / Category</label>
                <input
                  type="text"
                  value={selectedCropCategory}
                  onChange={(e) => setSelectedCropCategory(e.target.value)}
                  placeholder="e.g. Tomato, Corn, Rice, Apple, Coffee"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/60"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Vision Stage & Pathology Report (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual Bounding Box Canvas Stage */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="text-sm font-bold text-white">Multimodal Hotspot Pathology Canvas</h3>
                </div>

                <button
                  onClick={() => runVisionAnalysis(selectedSampleId, customImageBase64)}
                  disabled={isAnalyzing}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-500/30 transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? "animate-spin" : ""}`} />
                  <span>Re-analyze</span>
                </button>
              </div>

              {/* Image Container with Hotspot Overlay */}
              <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                {isAnalyzing ? (
                  <div className="text-center space-y-3 z-20">
                    <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin mx-auto" />
                    <p className="text-sm font-bold text-white">Running Gemma 4 Multimodal Spectral Vision...</p>
                    <p className="text-xs text-slate-400 font-mono">Extracting cellular lesion boundaries & spore vectors</p>
                  </div>
                ) : (
                  <>
                    <img
                      src={currentDisplayImage}
                      alt="Scanned Leaf"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />

                    {/* Interactive Hotspot Bounding Boxes */}
                    {analysisResult && analysisResult.diseaseHotspots && (
                      <div className="absolute inset-0 pointer-events-none">
                        {analysisResult.diseaseHotspots.map((spot, idx) => (
                          <div
                            key={idx}
                            className={`absolute border-2 rounded-lg transition-all animate-pulse ${
                              spot.severity === "High"
                                ? "border-rose-500 bg-rose-500/20"
                                : spot.severity === "Medium"
                                ? "border-amber-500 bg-amber-500/20"
                                : "border-emerald-400 bg-emerald-400/20"
                            }`}
                            style={{
                              left: `${spot.x}%`,
                              top: `${spot.y}%`,
                              width: `${spot.width}%`,
                              height: `${spot.height}%`,
                            }}
                          >
                            <span className={`absolute -top-6 left-0 text-[10px] font-bold px-2 py-0.5 rounded shadow ${
                              spot.severity === "High" ? "bg-rose-600 text-white" : "bg-amber-600 text-white"
                            }`}>
                              {spot.label} ({spot.severity})
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Diagnostic Pathology Report Card */}
            {analysisResult && !isAnalyzing && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl animate-in fade-in duration-300">
                {/* Status Header */}
                <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  analysisResult.isHealthy
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-200"
                    : analysisResult.severityLevel.includes("High")
                    ? "bg-rose-500/10 border-rose-500/40 text-rose-200"
                    : "bg-amber-500/10 border-amber-500/40 text-amber-200"
                }`}>
                  <div className="flex items-center space-x-3">
                    {analysisResult.isHealthy ? (
                      <CheckCircle2 className="w-10 h-10 text-emerald-400 shrink-0" />
                    ) : (
                      <ShieldAlert className="w-10 h-10 text-rose-400 shrink-0" />
                    )}
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider block opacity-80">
                        Diagnostic Pathology Result
                      </span>
                      <h2 className="text-xl font-extrabold">{analysisResult.diseaseName}</h2>
                      {analysisResult.scientificName && (
                        <p className="text-xs italic opacity-90">{analysisResult.scientificName}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4">
                    <div className="font-mono">
                      <span className="text-[10px] uppercase block opacity-70">Confidence</span>
                      <span className="text-lg font-extrabold">{analysisResult.confidenceScore}%</span>
                    </div>
                    <div className="font-mono">
                      <span className="text-[10px] uppercase block opacity-70">Area Affected</span>
                      <span className="text-lg font-extrabold">{analysisResult.affectedAreaPercent}%</span>
                    </div>
                  </div>
                </div>

                {/* Multilingual Audio Remedy Player */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white">Hands-Free Multilingual Spoken Audio Remedy</span>
                    </div>

                    {/* Language Selector */}
                    <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                      {[
                        { code: "ga", label: "🇬🇭 Gã / Garnett" },
                        { code: "fat", label: "🇬🇭 Fante" },
                        { code: "twi", label: "🇬🇭 Asante Twi" },
                        { code: "ee", label: "🇬🇭 Ewe" },
                        { code: "ha", label: "🇬🇭 Hausa" },
                        { code: "en", label: "🇬🇭 Ghanaian English" },
                        { code: "fr", label: "🇫🇷 French" },
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageClick(lang.code as any)}
                          title={`Click for instant spoken audio guide in ${lang.label}`}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all flex items-center space-x-1 ${
                            selectedLang === lang.code
                              ? "bg-emerald-500 text-slate-950 shadow-sm ring-1 ring-emerald-400"
                              : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                          }`}
                        >
                          <span>{lang.label}</span>
                          {selectedLang === lang.code && isPlayingAudio && (
                            <Volume2 className="w-3 h-3 animate-pulse text-slate-950" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Dialect Written Script Display */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                        <span>
                          🗣️ Written Script in {
                            selectedLang === "ga" ? "Gã / Garnett Dialect (Accra)" :
                            selectedLang === "fat" ? "Fante Mfantse Dialect" :
                            selectedLang === "twi" ? "Asante Twi Dialect" :
                            selectedLang === "ee" ? "Ewe Dialect (Volta)" :
                            selectedLang === "ha" ? "Hausa Dialect" :
                            selectedLang === "en" ? "Ghanaian English" : "French (Français)"
                          }:
                        </span>
                      </span>
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                        {selectedVoice} Voice Active
                      </span>
                    </div>

                    <p className="text-xs text-slate-100 font-medium leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                      "{analysisResult.multilingualAudioScript[selectedLang] || analysisResult.multilingualAudioScript.en}"
                    </p>
                  </div>

                  {/* AI Voice Model Selector */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-slate-900 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>AI Voice Persona (Natural Human Speech):</span>
                      </span>
                      <button
                        onClick={() => {
                          setSelectedVoice("Garnet");
                          testVoiceTone("Garnet");
                        }}
                        className="text-[10px] bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-md font-mono font-bold transition-all flex items-center gap-1"
                      >
                        <span>{selectedVoice === "Garnet" ? "⭐ Garnet (Active)" : "Select Garnet Voice"}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 bg-slate-900 p-2 rounded-xl border border-slate-800">
                      {[
                        { id: "Garnet", label: "Garnet ⭐", desc: "Expressive & Clear (Garnett Voice)", badge: "Female" },
                        { id: "Aoede", label: "Aoede", desc: "Warm & Natural", badge: "Female" },
                        { id: "Leda", label: "Leda", desc: "Bright & Clear", badge: "Female" },
                        { id: "Callirhoe", label: "Callirhoe", desc: "Gentle & Smooth", badge: "Female" },
                        { id: "Zephyr", label: "Zephyr", desc: "Soft & Balanced", badge: "Female" },
                        { id: "Kore", label: "Kore", desc: "Crisp & Energetic", badge: "Female" },
                        { id: "Puck", label: "Puck", desc: "Clear & Friendly", badge: "Male" },
                        { id: "Orpheus", label: "Orpheus", desc: "Calm & Natural", badge: "Male" },
                        { id: "Fenrir", label: "Fenrir", desc: "Strong & Direct", badge: "Male" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedVoice(item.id);
                            testVoiceTone(item.id);
                          }}
                          className={`flex flex-col text-left px-2.5 py-1.5 rounded-lg transition-all ${
                            selectedVoice === item.id
                              ? "bg-emerald-500 text-slate-950 font-bold shadow-md ring-1 ring-emerald-400"
                              : "bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800/60"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-[11px] font-bold">{item.label}</span>
                            <span className={`text-[8.5px] px-1 py-0.2 rounded font-mono uppercase ${
                              selectedVoice === item.id ? "bg-slate-950 text-emerald-400 font-bold" : "bg-slate-800 text-slate-400"
                            }`}>
                              {item.badge}
                            </span>
                          </div>
                          <span className={`text-[9.5px] truncate ${
                            selectedVoice === item.id ? "text-slate-900 font-medium" : "text-slate-400"
                          }`}>
                            {item.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Test Audition & Play Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => testVoiceTone()}
                      disabled={isAuditioning}
                      className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isAuditioning ? "animate-spin text-emerald-400" : ""}`} />
                      <span>{isAuditioning ? "Testing Voice..." : "🔊 Sample Voice Tone"}</span>
                    </button>

                    <button
                      onClick={handlePlayAudio}
                      className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                    >
                      {isPlayingAudio ? (
                        <>
                          <VolumeX className="w-4 h-4 animate-bounce" />
                          <span>Pause Spoken Audio</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4" />
                          <span>Play Audio Guidance in {selectedLang.toUpperCase()}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Primary Symptoms & Microclimate Advisory Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Identified Symptoms</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {analysisResult.primarySymptoms.map((sym, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                      <CloudRain className="w-3.5 h-3.5 text-teal-400" />
                      <span>Microclimate & Spore Risk</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {analysisResult.microclimateAdvisory}
                    </p>
                  </div>
                </div>

                {/* Dedicated Studio Native Dialect Audio Player (cassava_twi.mp3) */}
                {(analysisResult.diseaseName.toLowerCase().includes("cassava") || analysisResult.audioFile) && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/80 via-slate-950 to-slate-900 border border-emerald-500/40 space-y-3 shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/20 pb-2">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>Studio Native Local Voice Recording</span>
                          <span className="text-[9.5px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                            cassava_twi.mp3
                          </span>
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                        Akan Asante Twi / West African Extension
                      </span>
                    </div>

                    <audio
                      ref={mp3AudioRef}
                      src="/cassava_twi.mp3"
                      onTimeUpdate={() => {
                        if (mp3AudioRef.current) {
                          setMp3Time(mp3AudioRef.current.currentTime);
                          setMp3Duration(mp3AudioRef.current.duration || 0);
                        }
                      }}
                      onEnded={() => setMp3IsPlaying(false)}
                      className="hidden"
                    />

                    <div className="flex items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <button
                        onClick={toggleMp3Play}
                        className="p-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-md shrink-0"
                        title="Play or Pause Local Dialect MP3 Recording"
                      >
                        {mp3IsPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
                          <span>{mp3IsPlaying ? "Playing local voice recording..." : "Ready to play local recording"}</span>
                          <span>
                            {Math.floor(mp3Time / 60)}:{(Math.floor(mp3Time % 60)).toString().padStart(2, '0')} / {Math.floor(mp3Duration / 60) || 0}:{(Math.floor(mp3Duration % 60) || 0).toString().padStart(2, '0')}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={mp3Duration || 100}
                          value={mp3Time}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setMp3Time(val);
                            if (mp3AudioRef.current) mp3AudioRef.current.currentTime = val;
                          }}
                          className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            const newRate = mp3Rate === 0.9 ? 1.0 : mp3Rate === 1.0 ? 1.2 : 0.9;
                            setMp3Rate(newRate);
                            if (mp3AudioRef.current) mp3AudioRef.current.playbackRate = newRate;
                          }}
                          className="px-2 py-1 text-[10px] font-mono font-bold rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700"
                        >
                          {mp3Rate}x
                        </button>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 italic">
                      💡 <strong>Note for User/Tester:</strong> This player plays <code>/public/cassava_twi.mp3</code>. You can replace that file at any time with your own studio voice recording.
                    </p>
                  </div>
                )}

                {/* Immediate Remedies (Organic vs Chemical) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Recommended Action Schedule
                    </h4>

                    {/* Read Aloud Button next to Treatment Advice */}
                    <button
                      onClick={() => handleReadAloudTreatment()}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all shadow-sm"
                      title="Read Treatment Advice out loud in clear West African / English accent (en-NG, 0.9x speed)"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>🔊 Read Aloud</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-emerald-400 block">
                          🌱 Immediate Organic Remedy
                        </span>
                        <button
                          onClick={() => handleReadAloudTreatment(`Immediate Organic Remedy: ${analysisResult.immediateOrganicRemedy}`)}
                          className="text-[10px] text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Read</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {analysisResult.immediateOrganicRemedy}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-indigo-300 block">
                          🧪 Targeted Chemical Treatment
                        </span>
                        <button
                          onClick={() => handleReadAloudTreatment(`Targeted Chemical Treatment: ${analysisResult.chemicalTreatment}`)}
                          className="text-[10px] text-indigo-300 hover:underline font-semibold flex items-center gap-1"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Read</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {analysisResult.chemicalTreatment}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Economic Loss Prevention Footer */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950 to-slate-950 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block">Projected Yield Loss Prevented</span>
                    <h4 className="text-lg font-extrabold text-white">{analysisResult.estimatedEconomicLossPrevention}</h4>
                  </div>

                  <button
                    onClick={() => setActiveTab("dosage")}
                    className="flex items-center space-x-1 text-xs font-bold text-emerald-300 hover:text-white transition-colors"
                  >
                    <span>Calculate Farm Dosage</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODULE 2: AI AGRONOMIST CHAT ADVISOR */}
      {activeTab === "advisor" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>Interactive AI Agronomist Consultation</span>
              </div>
              <h2 className="text-xl font-extrabold text-white mt-2">Gemma 4 Plant Pathology Advisor</h2>
              <p className="text-xs text-slate-400">Ask any specific field question regarding crop diseases, soil nutrients, organic spray intervals, or irrigation.</p>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Suggested Agronomist Prompts:</span>
            <div className="flex flex-wrap gap-2">
              {[
                "How do I manage tomato late blight in heavy rain?",
                "What organic spray stops corn rust pustules?",
                "What is the optimal nitrogen application for rice panicles?",
                "How can I adjust soil pH for high copper fungicide absorption?"
              ].map((promptText, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(promptText)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-all text-left"
                >
                  "{promptText}"
                </button>
              ))}
            </div>
          </div>

          {/* Chat Stream Window */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 h-96 overflow-y-auto space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${
                  msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.sender === "user"
                    ? "bg-emerald-500 text-slate-950 font-bold"
                    : "bg-slate-800 border border-slate-700 text-emerald-400"
                }`}>
                  {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`p-4 rounded-2xl text-xs max-w-xl leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-100"
                    : "bg-slate-900 border border-slate-800 text-slate-200"
                }`}>
                  <p>{msg.text}</p>
                  
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80">
                    <span className="text-[9px] text-slate-500 font-mono">{msg.timestamp}</span>
                    
                    {msg.sender === "bot" && (
                      <button
                        onClick={() => {
                          if ('speechSynthesis' in window) {
                            window.speechSynthesis.cancel();
                            const u = new SpeechSynthesisUtterance(msg.text);
                            u.rate = 0.9;
                            u.lang = selectedLang === "fr" ? "fr-FR" : "en-GH";
                            window.speechSynthesis.speak(u);
                          }
                        }}
                        className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1 bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/20 transition-all"
                        title="Listen to this spoken agronomist answer"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen Voice</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isSendingChat && (
              <div className="flex items-center space-x-2 text-xs text-slate-400 italic">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Gemma 4 AI Agronomist is reasoning...</span>
              </div>
            )}
          </div>

          {/* Active Voice Microphone Recording Bar */}
          {isRecordingMic && (
            <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 animate-pulse">
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <div>
                  <span className="text-xs font-bold text-white block">Recording Farmer Voice Query...</span>
                  <span className="text-[10px] font-mono text-rose-300">
                    Duration: 00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}s • Speak clearly in Twi, Fante, Hausa, or English
                  </span>
                </div>
              </div>

              {/* Animated Waveform Visualizer */}
              <div className="flex items-center space-x-1 h-6">
                {[40, 80, 60, 100, 70, 90, 50, 85, 65, 95].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-rose-400 rounded-full animate-bounce"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>

              <button
                onClick={stopVoiceRecording}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md transition-all"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop Recording</span>
              </button>
            </div>
          )}

          {/* Recorded Audio Preview Box */}
          {recordedAudioUrl && !isRecordingMic && (
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <Volume2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="text-xs font-bold text-white block">Recorded Voice Note Preview</span>
                  <audio src={recordedAudioUrl} controls className="h-7 w-48 sm:w-64 mt-1" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    if (inputMessage.trim() || recordedSpeechTranscript.trim()) {
                      handleSendMessage(inputMessage || recordedSpeechTranscript);
                    } else {
                      handleSendMessage("Audio voice query submitted: Please assist with my field conditions.");
                    }
                    setRecordedAudioUrl(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Voice Query</span>
                </button>
                <button
                  onClick={() => setRecordedAudioUrl(null)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  Discard
                </button>
              </div>
            </div>
          )}

          {/* Chat Input Box */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={isRecordingMic ? stopVoiceRecording : startVoiceRecording}
              className={`p-3 rounded-2xl border transition-all shrink-0 ${
                isRecordingMic
                  ? "bg-rose-600 border-rose-500 text-white animate-pulse"
                  : "bg-slate-950 border-slate-800 text-emerald-400 hover:border-emerald-500/60 hover:bg-slate-900"
              }`}
              title={isRecordingMic ? "Stop voice recording" : "Record spoken audio voice note"}
            >
              {isRecordingMic ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask your AI Agronomist or tap mic to speak..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500/60"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isSendingChat || !inputMessage.trim()}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      )}

      {/* MODULE 3: MICROCLIMATE SPORE RADAR */}
      {activeTab === "outbreak" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold">
                <CloudRain className="w-4 h-4 text-teal-400" />
                <span>Micro-Climate Spore Dispersal Simulator</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-2">Fungal Spore Germination & Outbreak Forecast</h2>
              <p className="text-xs text-slate-400">Simulate humidity, wind vector, and regional pathogen spore propagation across African farm stations.</p>
            </div>

            {/* GPS Auto Detect Action in Module 3 */}
            <button
              onClick={onDetectGps}
              disabled={isLocatingGps}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all shadow-md shrink-0"
            >
              <MapPin className={`w-4 h-4 text-emerald-400 ${isLocatingGps ? "animate-spin" : ""}`} />
              <span>{isLocatingGps ? "Detecting Satellite Coords..." : "🎯 Detect My GPS Location"}</span>
            </button>
          </div>

          {/* Active Station Multi-Site Profile Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/30 space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{selectedSite.countryFlag}</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-extrabold text-white">{selectedSite.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      {selectedSite.stationCode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{selectedSite.region} • {selectedSite.country}</p>
                </div>
              </div>

              {/* Quick Station Switcher Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 mr-1 hidden sm:inline">Switch Station:</span>
                {FARM_SITES.map((site) => (
                  <button
                    key={site.id}
                    onClick={() => onSelectSite(site)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      selectedSite.id === site.id
                        ? "bg-emerald-500 text-slate-950 shadow-md scale-105"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    }`}
                  >
                    {site.countryFlag} {site.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Site Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">GPS Coords</span>
                <span className="text-slate-200 font-mono font-semibold">{selectedSite.latLngString}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Dominant Crops</span>
                <span className="text-emerald-300 font-semibold">{selectedSite.dominantCrops.join(", ")}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Primary Pathogen</span>
                <span className="text-amber-300 font-semibold">{selectedSite.primaryPathogenRisk}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Station Agronomist</span>
                <span className="text-slate-200 font-semibold">{selectedSite.agronomicOfficer}</span>
              </div>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 flex items-center space-x-1">
                  <Droplets className="w-3.5 h-3.5 text-teal-400" />
                  <span>Humidity Level</span>
                </span>
                <span className="font-mono text-teal-400 font-bold">{humidity}%</span>
              </div>
              <input
                type="range"
                min={30}
                max={100}
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full accent-teal-400"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 flex items-center space-x-1">
                  <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Temperature (°C)</span>
                </span>
                <span className="font-mono text-amber-400 font-bold">{temperature}°C</span>
              </div>
              <input
                type="range"
                min={10}
                max={40}
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 flex items-center space-x-1">
                  <Wind className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Wind Velocity</span>
                </span>
                <span className="font-mono text-emerald-400 font-bold">{windSpeed} km/h</span>
              </div>
              <input
                type="range"
                min={2}
                max={50}
                value={windSpeed}
                onChange={(e) => setWindSpeed(Number(e.target.value))}
                className="w-full accent-emerald-400"
              />
            </div>
          </div>

          {/* Outbreak Risk Gauge Calculation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Spore Germination Window</span>
              <h3 className="text-3xl font-extrabold text-teal-400">
                {humidity > 80 ? "CRITICAL (Under 4h)" : "LOW (>24h)"}
              </h3>
              <p className="text-xs text-slate-400">
                {humidity > 80 ? "Extreme fungal spore multiplication risk" : "Favorable dry leaf surface conditions"}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Dispersal Radius Vector</span>
              <h3 className="text-3xl font-extrabold text-amber-400">
                {(windSpeed * 1.8).toFixed(1)} km / day
              </h3>
              <p className="text-xs text-slate-400">Airborne spore transport toward neighboring plots</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Blight Hazard Index</span>
              <h3 className={`text-3xl font-extrabold ${humidity > 80 ? "text-rose-400" : "text-emerald-400"}`}>
                {humidity > 80 ? "HIGH RISK (9.2/10)" : "SAFE (2.1/10)"}
              </h3>
              <p className="text-xs text-slate-400">
                {humidity > 80 ? "Immediate preventive fungicide spray required" : "Routine weekly field scouting"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: DOSAGE & ROI CALCULATOR */}
      {activeTab === "dosage" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Farm Scale Economics</span>
            </div>
            <h2 className="text-xl font-bold text-white">Treatment Dosage & Financial Loss Calculator</h2>
            <p className="text-xs text-slate-400">Calculate required spray volume, chemical cost, and net saved crop value based on farm size.</p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 max-w-md space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              Enter Total Farm Field Size (Acres):
            </label>
            <input
              type="number"
              min={1}
              max={1000}
              value={farmAcres}
              onChange={(e) => setFarmAcres(Math.max(1, Number(e.target.value)))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xl font-extrabold text-emerald-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Fungicide Concentrate Volume</span>
              <h3 className="text-2xl font-extrabold text-white">{(farmAcres * 0.85).toFixed(1)} Gallons</h3>
              <p className="text-xs text-slate-400">Copper Octanoate liquid spray</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Application Cost</span>
              <h3 className="text-2xl font-extrabold text-amber-400">GH₵ {(farmAcres * 420).toLocaleString()}</h3>
              <p className="text-xs text-slate-400">GH₵ 420 / acre input expense</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Projected Crop Value Saved</span>
              <h3 className="text-2xl font-extrabold text-emerald-400">GH₵ {(farmAcres * 5800).toLocaleString()}</h3>
              <p className="text-xs text-slate-400">Prevented harvest loss in Ghanaian Cedis</p>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 5: FIELD SCAN RECORDS & LOGS */}
      {activeTab === "records" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Regional Field Diagnostic History</h2>
              <p className="text-xs text-slate-400">Historical leaf scans, disease severities, and plot location logs.</p>
            </div>

            <button
              onClick={() => {
                const csvData = scanLogs.map((l) => `${l.id},${l.cropName},${l.diseaseName},${l.severity},${l.confidence}%,${l.location}`).join("\n");
                const blob = new Blob([`ID,Crop,Disease,Severity,Confidence,Location\n` + csvData], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "agrivision_field_scans.csv";
                a.click();
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-emerald-400 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV Diagnostic Report</span>
            </button>
          </div>

          <div className="space-y-3">
            {scanLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{log.cropName}</h4>
                  <p className="text-xs text-slate-400">{log.diseaseName} • {log.location}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                    log.isHealthy ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                  }`}>
                    {log.severity} ({log.confidence}%)
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
