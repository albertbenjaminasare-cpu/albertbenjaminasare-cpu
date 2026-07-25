import React, { useState, useEffect } from "react";
import { ProjectIdea, SuperchargedAnalysis, ContestTrack } from "../types";
import { Zap, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Play, Send, Copy, Check, ArrowRight } from "lucide-react";

interface IdeaSuperchargerProps {
  initialIdea?: ProjectIdea | null;
  onProceedToJudge: (title: string, description: string) => void;
}

export const IdeaSupercharger: React.FC<IdeaSuperchargerProps> = ({
  initialIdea,
  onProceedToJudge,
}) => {
  const [inputText, setInputText] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<ContestTrack>("AI & Agents");
  const [isSupercharging, setIsSupercharging] = useState(false);
  const [analysis, setAnalysis] = useState<SuperchargedAnalysis | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);

  useEffect(() => {
    if (initialIdea) {
      setInputText(`${initialIdea.title}: ${initialIdea.problemStatement}`);
      setSelectedTrack(initialIdea.track);
    }
  }, [initialIdea]);

  const handleSupercharge = async () => {
    if (!inputText.trim()) return;
    setIsSupercharging(true);
    try {
      const res = await fetch("/api/supercharge-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userIdea: inputText,
          track: selectedTrack,
        }),
      });
      const data = await res.json();
      if (data.analysis) {
        setAnalysis(data.analysis);
      }
    } catch (err) {
      console.error("Supercharge failed:", err);
    } finally {
      setIsSupercharging(false);
    }
  };

  const handleCopyPitchScript = () => {
    if (!analysis) return;
    const text = analysis.pitchFlow
      .map((p) => `[${p.timestamp}] ${p.phase}\n${p.script}\n`)
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" />
          <span>AI Mentor & Contest Architect</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Supercharge Any Idea into a Contest Winner
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Have a rough project idea? Paste it below! Gemini 3.6 Flash will analyze hackathon judge rubrics, inject a 10x novelty angle, design a 30-second 'WOW' demo, and output a complete pitch script.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
            Describe Your Raw Project Concept or Idea
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g. A voice assistant that helps elders remember their medicine, or a tool that analyzes codebase vulnerabilities using AI..."
            rows={4}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all resize-none"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-400">Target Track:</span>
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value as ContestTrack)}
              className="bg-slate-950 border border-slate-800 text-amber-300 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-amber-500/50"
            >
              <option value="AI & Agents">AI & Agents</option>
              <option value="Healthcare & Bio">Healthcare & Bio</option>
              <option value="Climate & Sustainability">Climate & Sustainability</option>
              <option value="FinTech & Web3">FinTech & Web3</option>
              <option value="Future of Work & DevTools">Future of Work & DevTools</option>
              <option value="Education & Accessibility">Education & Accessibility</option>
              <option value="Multimodal & Vision">Multimodal & Vision</option>
            </select>
          </div>

          <button
            onClick={handleSupercharge}
            disabled={isSupercharging || !inputText.trim()}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isSupercharging ? "animate-spin" : ""}`} />
            <span>{isSupercharging ? "Supercharging with Gemini AI..." : "Supercharge My Idea"}</span>
          </button>
        </div>
      </div>

      {/* Analysis Output Dashboard */}
      {analysis && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Main Title & Novelty Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-amber-500/40 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                  {selectedTrack} Winner Blueprint
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  {analysis.superchargedTitle}
                </h2>
                <p className="text-sm text-slate-300 italic mt-1">"{analysis.tagline}"</p>
              </div>

              <div className="flex items-center space-x-4 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Novelty</span>
                  <span className="text-lg font-extrabold text-amber-400">{analysis.noveltyScore}%</span>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Feasibility</span>
                  <span className="text-lg font-extrabold text-emerald-400">{analysis.technicalFeasibilityScore}%</span>
                </div>
              </div>
            </div>

            {/* Why This Beats Standard Hackathon Projects */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Contest Winner Angle & Unfair Advantage</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {analysis.contestWinnerAngle}
              </p>
            </div>

            {/* Magic Demo Moment */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>The 30-Second Magic Demo Moment</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
                {analysis.magicDemoMoment}
              </p>
            </div>
          </div>

          {/* Features & Architecture Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Suggested Features */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>3 High-Impact Features to Build</span>
              </h3>
              <div className="space-y-3">
                {analysis.suggestedFeatures.map((feat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{feat.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${
                        feat.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                        feat.difficulty === "Medium" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                        "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}>
                        {feat.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{feat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span>Recommended System Stack</span>
              </h3>
              <div className="space-y-2">
                {analysis.recommendedArchitecture.map((arch, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span>{arch}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3-Minute Presentation Pitch Script Flow */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Exact 180-Second Spoken Pitch Script
                </h3>
              </div>
              <button
                onClick={handleCopyPitchScript}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedScript ? "Copied Script!" : "Copy Script"}</span>
              </button>
            </div>

            <div className="space-y-3">
              {analysis.pitchFlow.map((phase, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 font-mono">
                      {phase.timestamp} — {phase.phase}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    "{phase.script}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Anticipated Judge Questions & Answers */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Anticipated Judge Objections & Winning Answers</span>
            </h3>

            <div className="space-y-3">
              {analysis.anticipatedJudgeQuestions.map((q, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Judge: {q.judgeType}
                  </span>
                  <p className="text-xs font-bold text-rose-300">
                    Q: "{q.question}"
                  </p>
                  <p className="text-xs text-emerald-300 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                    <strong>Winning Response:</strong> {q.winningAnswer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => onProceedToJudge(analysis.superchargedTitle, analysis.tagline)}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all"
            >
              <span>Practice Pitch in AI Judge Panel Arena</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
