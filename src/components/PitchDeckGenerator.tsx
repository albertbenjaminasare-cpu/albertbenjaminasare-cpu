import React, { useState } from "react";
import { SlideItem } from "../types";
import { Sparkles, Copy, Check, Presentation, ChevronLeft, ChevronRight, Eye, RefreshCw } from "lucide-react";

export const PitchDeckGenerator: React.FC = () => {
  const [title, setTitle] = useState("OmniGuard: Real-Time Deepfake Defense");
  const [description, setDescription] = useState("A live browser extension & AI proxy detecting synthetic audio voice clones and deepfake video streams during critical calls.");
  const [track, setTrack] = useState("AI & Agents");
  const [isGenerating, setIsGenerating] = useState(false);
  const [slides, setSlides] = useState<SlideItem[]>([
    {
      slideNumber: 1,
      title: "OmniGuard AI",
      subtitle: "Real-Time Multimodal Voice Clone & Deepfake Defense",
      bulletPoints: [
        "Sub-150ms Client Spectral Verification Engine",
        "Prevents $800M+ Synthetic Audio Wire Scams",
        "Zero API Key Exposure with Server Proxy"
      ],
      visualIdea: "Dark aesthetic dashboard displaying live frequency spectrograph with green 'VERIFIED HUMAN' and flashing red 'AI CLONE DETECTED' badges.",
      speakerNote: "Good afternoon judges! Today we present OmniGuard — the real-time defense layer protecting critical audio calls from AI voice clones."
    },
    {
      slideNumber: 2,
      title: "The $800M Deepfake Threat",
      subtitle: "Synthetic voice cloning has made identity verification broken",
      bulletPoints: [
        "Voice cloning requires only 3 seconds of audio sample",
        "Traditional 2FA & security questions are vulnerable to social engineering",
        "800% increase in synthetic voice fraud in 2025-2026"
      ],
      visualIdea: "Split diagram: 3-second audio snippet transforming into synthetic clone bypassing legacy phone verification.",
      speakerNote: "With modern AI models, anyone can clone a voice in seconds. Existing biometric security systems simply weren't built for this."
    },
    {
      slideNumber: 3,
      title: "Live Solution & 100ms WOW Demo",
      subtitle: "Instant spectral resonance & formant analysis",
      bulletPoints: [
        "Web Audio API captures raw 16kHz PCM stream locally",
        "Gemini 3.6 Flash multimodal reasoning checks acoustic jitter & shimmer",
        "Forensic PDF audit trail exported instantly for compliance"
      ],
      visualIdea: "Live screen recording or embedded interactive widget running live spectral analysis on incoming voice stream.",
      speakerNote: "Let me switch to our live demo environment right now. Watch as I speak into this microphone using an AI voice clone..."
    },
    {
      slideNumber: 4,
      title: "Technical Secret Sauce & Architecture",
      subtitle: "High-throughput edge-to-cloud security pipeline",
      bulletPoints: [
        "React 19 & WebAssembly FFT spectral pre-filtering",
        "Server-side Gemini 3.6 Flash multimodal verification API",
        "Sub-150ms round-trip latency under 10,000 concurrent call loads"
      ],
      visualIdea: "Clean architectural flowchart showing raw microphone PCM -> WebAssembly FFT -> Express Gemini Proxy -> Real-Time HUD Overlay.",
      speakerNote: "Under the hood, we process local spectral FFTs client-side, sending only high-variance acoustic feature vectors to our Gemini server proxy."
    },
    {
      slideNumber: 5,
      title: "Market Traction & Saturday Next Steps",
      subtitle: "Protecting fintech, customer support, and executive communications",
      bulletPoints: [
        "Deployable as Chrome Extension, Zoom Plugin, and Mobile SDK",
        "Enterprise API pricing at $0.002 per call minute",
        "Fully working prototype available today"
      ],
      visualIdea: "Integration logos (Zoom, Teams, Chrome, Twilio) + QR code for judges to test live on their smartphones.",
      speakerNote: "OmniGuard is ready today. Thank you, and we look forward to your questions!"
    }
  ]);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleGenerateDeck = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate-pitch-deck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, track }),
      });
      const data = await res.json();
      if (data.slides && Array.isArray(data.slides) && data.slides.length > 0) {
        setSlides(data.slides);
        setActiveSlideIndex(0);
      }
    } catch (err) {
      console.error("Failed to generate slide deck:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyMarkdown = () => {
    const md = slides
      .map(
        (s) =>
          `## Slide ${s.slideNumber}: ${s.title}\n*${s.subtitle}*\n\n` +
          s.bulletPoints.map((b) => `- ${b}`).join("\n") +
          `\n\n**Visual:** ${s.visualIdea}\n**Speaker Note:** "${s.speakerNote}"\n\n---\n`
      )
      .join("\n");
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentSlide = slides[activeSlideIndex] || slides[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Presentation className="w-3.5 h-3.5" />
          <span>3-Minute Pitch Deck Synthesizer</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Generate a 5-Slide Winning Presentation
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Judges give you 3 minutes. Generate a tight 5-slide deck complete with slide layouts, key points, visual diagrams, and exact spoken timing scripts.
        </p>
      </div>

      {/* Generator Input Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Project Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Project Track</label>
            <input
              type="text"
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-400 block mb-1">Core Description / Value Prop</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
          />
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied Markdown Deck!" : "Export Markdown"}</span>
          </button>

          <button
            onClick={handleGenerateDeck}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
            <span>{isGenerating ? "Generating Deck..." : "Synthesize Deck with Gemini"}</span>
          </button>
        </div>
      </div>

      {/* Interactive Slide Viewer Stage */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
        {/* Slide Counter Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 overflow-x-auto">
          <div className="flex items-center space-x-2">
            {slides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlideIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeSlideIndex === idx
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                Slide {s.slideNumber}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-400">
              Slide {activeSlideIndex + 1} of {slides.length}
            </span>
          </div>
        </div>

        {/* Current Slide Display Canvas */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/60 border border-slate-800/80 rounded-2xl p-8 min-h-[380px] flex flex-col justify-between shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Presentation className="w-32 h-32 text-amber-400" />
          </div>

          <div className="space-y-4 relative z-10">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Slide 0{currentSlide.slideNumber}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {currentSlide.title}
              </h2>
              <p className="text-xs sm:text-sm text-amber-200/90 font-medium mt-1">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Bullet Points */}
            <div className="space-y-2 pt-2">
              {currentSlide.bulletPoints.map((bp, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{bp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Diagram Recommendation Box */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 relative z-10 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/60 space-y-1">
            <span className="text-[10px] font-bold uppercase text-indigo-400 flex items-center space-x-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Recommended Visual / Graphic for Screen</span>
            </span>
            <p className="text-xs text-slate-300 italic">
              {currentSlide.visualIdea}
            </p>
          </div>
        </div>

        {/* Speaker Talking Note Banner */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
          <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider block">
            Spoken Script (What to say out loud during this slide - 20-30 seconds)
          </span>
          <p className="text-xs sm:text-sm text-amber-100 italic font-medium leading-relaxed">
            "{currentSlide.speakerNote}"
          </p>
        </div>

        {/* Slide Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeSlideIndex === 0}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Slide</span>
          </button>

          <button
            onClick={() => setActiveSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
            disabled={activeSlideIndex === slides.length - 1}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs disabled:opacity-30 hover:bg-amber-400 transition-all"
          >
            <span>Next Slide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
