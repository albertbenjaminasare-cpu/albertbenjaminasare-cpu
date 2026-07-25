import React, { useState } from "react";
import { PRESET_IDEAS } from "../data/presetIdeas";
import { ProjectIdea, ContestTrack } from "../types";
import { Sparkles, Trophy, Rocket, ChevronRight, CheckCircle2, RefreshCw, Zap, ShieldAlert, Cpu } from "lucide-react";

interface IdeaExplorerProps {
  onSelectIdeaForSupercharge: (idea: ProjectIdea) => void;
  onSelectIdeaForJudge: (idea: ProjectIdea) => void;
  onOpenPrototype: (demoId: string) => void;
}

const TRACKS: ("All" | ContestTrack)[] = [
  "All",
  "AI & Agents",
  "Healthcare & Bio",
  "Climate & Sustainability",
  "Future of Work & DevTools",
  "Multimodal & Vision",
  "Education & Accessibility",
];

export const IdeaExplorer: React.FC<IdeaExplorerProps> = ({
  onSelectIdeaForSupercharge,
  onSelectIdeaForJudge,
  onOpenPrototype,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<"All" | ContestTrack>("All");
  const [ideas, setIdeas] = useState<ProjectIdea[]>(PRESET_IDEAS);
  const [activeIdeaId, setActiveIdeaId] = useState<string | null>(PRESET_IDEAS[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const filteredIdeas = ideas.filter(
    (idea) => selectedTrack === "All" || idea.track === selectedTrack
  );

  const selectedIdea = ideas.find((i) => i.id === activeIdeaId) || ideas[0];

  const handleGenerateFreshIdeas = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/generate-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track: selectedTrack === "All" ? "AI & Agents" : selectedTrack,
          duration: "24 hours",
        }),
      });
      const data = await res.json();
      if (data.ideas && Array.isArray(data.ideas) && data.ideas.length > 0) {
        setIdeas((prev) => [...data.ideas, ...prev]);
        setActiveIdeaId(data.ideas[0].id);
      }
    } catch (err) {
      console.error("Failed to generate fresh ideas:", err);
      setErrorMsg("Failed to generate fresh AI ideas. Displaying curated winners.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Banner / Value Prop */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5" />
            <span>Saturday Hackathon Winning Blueprints</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Proven Contest-Winning Project Concepts
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Judges look for 3 things: <strong className="text-amber-300">High Novelty</strong>, <strong className="text-amber-300">A Sub-2-Second Live WOW Demo</strong>, and <strong className="text-amber-300">Technical Depth</strong>. Explore these contest-ready project blueprints or generate new ones powered by Gemini 3.6 Flash.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleGenerateFreshIdeas}
              disabled={isGenerating}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
              <span>{isGenerating ? "Synthesizing AI Ideas..." : "Synthesize Fresh AI Ideas"}</span>
            </button>
            <span className="text-xs text-slate-400 italic">
              Filtered for 24-48 hr execution timelines
            </span>
          </div>
        </div>
      </div>

      {/* Track Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {TRACKS.map((track) => (
          <button
            key={track}
            onClick={() => setSelectedTrack(track)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap border ${
              selectedTrack === track
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm"
                : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            {track}
          </button>
        ))}
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Grid: Idea Selector List + Detailed Blueprint View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Selected Concepts ({filteredIdeas.length})
          </h2>
          <div className="space-y-3 max-h-[720px] overflow-y-auto pr-1">
            {filteredIdeas.map((idea) => {
              const isSelected = idea.id === selectedIdea?.id;
              return (
                <div
                  key={idea.id}
                  onClick={() => setActiveIdeaId(idea.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-slate-900 border-amber-500/50 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/30"
                      : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                      {idea.track}
                    </span>
                    <div className="flex items-center space-x-1 text-xs font-bold text-amber-400">
                      <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{idea.noveltyScore}% Novelty</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white line-clamp-1 mb-1">
                    {idea.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {idea.tagline}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60 pt-2">
                    <div className="flex items-center space-x-1.5 text-indigo-300">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>{idea.techStack.slice(0, 2).join(", ")}</span>
                    </div>
                    {idea.hasLiveDemo && (
                      <span className="inline-flex items-center space-x-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>Live Demo</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Comprehensive Concept Blueprint */}
        <div className="lg:col-span-7">
          {selectedIdea ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl sticky top-24">
              {/* Header */}
              <div className="border-b border-slate-800 pb-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                    {selectedIdea.track}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold text-slate-400">Winning Potential:</span>
                    <span className="text-sm font-extrabold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                      {selectedIdea.noveltyScore}/100
                    </span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedIdea.title}
                </h2>
                <p className="text-sm text-slate-300 italic">
                  "{selectedIdea.tagline}"
                </p>
              </div>

              {/* WOW Factor Callout */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-indigo-500/10 border border-amber-500/30 space-y-2">
                <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>The 30-Second Judge 'WOW' Moment</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {selectedIdea.wowFactor}
                </p>
              </div>

              {/* Problem & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                    Problem Statement
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedIdea.problemStatement}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Core AI Solution
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedIdea.solution}
                  </p>
                </div>
              </div>

              {/* Key Features & Tech Stack */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Standout Features
                </h4>
                <div className="space-y-2">
                  {selectedIdea.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Recommended Architecture
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIdea.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300 text-xs font-mono border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 24-Hour Execution Roadmap */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  24-Hour Hackathon Execution Plan
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedIdea.roadmap.map((step, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-1">
                      <span className="text-[10px] font-bold text-amber-400 block">{step.hour}</span>
                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">{step.task}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                {selectedIdea.hasLiveDemo && selectedIdea.demoId && (
                  <button
                    onClick={() => onOpenPrototype(selectedIdea.demoId!)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-bold transition-all"
                  >
                    <Rocket className="w-4 h-4 text-emerald-400" />
                    <span>Run Interactive Demo</span>
                  </button>
                )}

                <div className="flex items-center space-x-2 ml-auto">
                  <button
                    onClick={() => onSelectIdeaForSupercharge(selectedIdea)}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-200 border border-indigo-500/30 text-xs font-medium transition-all"
                  >
                    <Zap className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Customize Idea</span>
                  </button>

                  <button
                    onClick={() => onSelectIdeaForJudge(selectedIdea)}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold text-xs shadow-md shadow-amber-500/20 transition-all"
                  >
                    <span>Practice Pitch</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
