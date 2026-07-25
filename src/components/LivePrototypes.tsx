import React, { useState } from "react";
import { DEMO_PROTOTYPES } from "../data/prototypesData";
import { Layers, Play, ShieldAlert, CheckCircle2, Sparkles, Activity, FileText, Download, Zap, RefreshCw } from "lucide-react";

interface LivePrototypesProps {
  initialDemoId?: string;
}

export const LivePrototypes: React.FC<LivePrototypesProps> = ({ initialDemoId = "omniguard" }) => {
  const [activeProtoKey, setActiveProtoKey] = useState<string>(
    DEMO_PROTOTYPES[initialDemoId] ? initialDemoId : "omniguard"
  );
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(true);

  const currentProto = DEMO_PROTOTYPES[activeProtoKey] || DEMO_PROTOTYPES["omniguard"];
  const currentSample = currentProto.sampleInputs[selectedSampleIndex] || currentProto.sampleInputs[0];

  const handleRunTest = () => {
    setIsAnalyzing(true);
    setIsDone(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsDone(true);
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Interactive Live Prototype Simulator</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Test Live Interactive Winning Prototypes
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Nothing beats a working prototype during a 3-minute hackathon demo. Test these 4 live interactive project simulators directly in your browser.
        </p>
      </div>

      {/* Prototype Selector Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.values(DEMO_PROTOTYPES).map((proto) => {
          const isActive = proto.id === activeProtoKey;
          return (
            <button
              key={proto.id}
              onClick={() => {
                setActiveProtoKey(proto.id);
                setSelectedSampleIndex(0);
                setIsDone(true);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isActive
                  ? "bg-slate-900 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30"
                  : "bg-slate-900/50 border-slate-800 hover:bg-slate-900/80 text-slate-400"
              }`}
            >
              <span className="text-[10px] font-bold uppercase text-amber-400 block mb-1">
                {proto.badge}
              </span>
              <h4 className="text-xs font-bold text-white line-clamp-1">{proto.name}</h4>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Prototype Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md">
                {currentProto.badge}
              </span>
              <span className="text-xs font-mono text-slate-400">Sub-200ms Inference</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {currentProto.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 italic">
              "{currentProto.tagline}"
            </p>
          </div>

          <button
            onClick={handleRunTest}
            disabled={isAnalyzing}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isAnalyzing ? "animate-spin" : ""}`} />
            <span>{isAnalyzing ? "Processing Stream..." : "Run Live Analysis"}</span>
          </button>
        </div>

        {/* Input Selector Dropdown / Pills */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Select Live Demo Scenario / Sample Stream
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {currentProto.sampleInputs.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedSampleIndex(idx);
                  handleRunTest();
                }}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  selectedSampleIndex === idx
                    ? "bg-slate-950 text-white border-amber-500/50 shadow-md"
                    : "bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700"
                }`}
              >
                <span className="font-bold block text-slate-200 mb-0.5">{sample.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Sample Log Banner */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Input Stream Telemetry</span>
          <p className="text-slate-200 leading-relaxed">{currentSample.value}</p>
        </div>

        {/* Live Simulation Visual Area */}
        {isAnalyzing ? (
          <div className="p-12 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
            <h4 className="text-sm font-bold text-white">Extracting Multimodal Feature Vectors...</h4>
            <p className="text-xs text-slate-400 font-mono">Running Gemini 3.6 Flash spectral & acoustic inference engine</p>
          </div>
        ) : isDone && currentSample.extra ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* 1. OMNIGUARD DEMO OUTPUT */}
            {activeProtoKey === "omniguard" && (
              <div className="space-y-4">
                <div className={`p-5 rounded-2xl border ${
                  currentSample.extra.isDeepfake
                    ? "bg-rose-500/10 border-rose-500/40 text-rose-200"
                    : "bg-emerald-500/10 border-emerald-500/40 text-emerald-200"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {currentSample.extra.isDeepfake ? (
                        <ShieldAlert className="w-8 h-8 text-rose-400" />
                      ) : (
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                      )}
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider block">
                          Forensic Result
                        </span>
                        <h3 className="text-lg font-extrabold">{currentSample.extra.status}</h3>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-[10px] uppercase block">Confidence</span>
                      <span className="text-xl font-extrabold">{currentSample.extra.confidence}%</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Spectrograph Waveform Visualizer */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                    <span>Spectral Frequency Analysis (20Hz - 20kHz)</span>
                    <span className="text-amber-400">FFT Window: 2048 pts</span>
                  </div>
                  <div className="h-24 flex items-end justify-between gap-1 pt-2">
                    {Array.from({ length: 32 }).map((_, i) => {
                      const h = currentSample.extra.isDeepfake
                        ? Math.sin(i * 0.8) * 40 + 50
                        : Math.cos(i * 0.5) * 30 + 40;
                      return (
                        <div
                          key={i}
                          className={`w-full rounded-t transition-all duration-500 ${
                            currentSample.extra.isDeepfake ? "bg-rose-500" : "bg-emerald-400"
                          }`}
                          style={{ height: `${Math.max(15, h)}%` }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 2. ECHOPULSE DEMO OUTPUT */}
            {activeProtoKey === "echopulse" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Physiological Stress Score</span>
                    <h3 className="text-2xl font-extrabold text-amber-400">{currentSample.extra.stressLevel}</h3>
                    <p className="text-xs text-slate-300">Fatigue Status: <strong className="text-white">{currentSample.extra.fatigueIndex}</strong></p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Acoustic Radar Scores</span>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>Physical: <strong className="text-amber-300">{currentSample.extra.radar.physical}%</strong></div>
                      <div>Mental: <strong className="text-amber-300">{currentSample.extra.radar.mental}%</strong></div>
                      <div>Respiratory: <strong className="text-amber-300">{currentSample.extra.radar.respiratory}%</strong></div>
                      <div>Vocal Stamina: <strong className="text-amber-300">{currentSample.extra.radar.stamina}%</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. CLIMAGRID DEMO OUTPUT */}
            {activeProtoKey === "climagrid" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Grid Efficiency</span>
                  <h3 className="text-2xl font-extrabold text-emerald-400">{currentSample.extra.gridEfficiency}%</h3>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Carbon Saved / Day</span>
                  <h3 className="text-2xl font-extrabold text-amber-400">{currentSample.extra.carbonSavedKg} kg</h3>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Battery Discharge</span>
                  <h3 className="text-lg font-extrabold text-indigo-300">{currentSample.extra.activeBatteryDischarge}</h3>
                </div>
              </div>
            )}

            {/* 4. LEXIGUARD DEMO OUTPUT */}
            {activeProtoKey === "lexiguard" && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold text-rose-400">Risk Assessment</span>
                    <span className="text-xs font-bold text-rose-300 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                      {currentSample.extra.riskLevel}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{currentSample.extra.primaryConcern}</h4>
                  <p className="text-xs text-slate-300">
                    <strong>Suggested Counter-Offer Clause:</strong> {currentSample.extra.suggestedRewrite}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
