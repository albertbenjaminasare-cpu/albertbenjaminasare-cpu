import React, { useState } from "react";
import { JudgeFeedback } from "../types";
import { Users, Send, Trophy, Sparkles, AlertCircle, CheckCircle2, ShieldCheck, RefreshCw, MessageSquare } from "lucide-react";

interface JudgeSimulatorProps {
  initialTitle?: string;
  initialDescription?: string;
}

const JUDGE_PERSONAS = [
  {
    id: "Technical Architect",
    name: "Dr. Evelyn Vance",
    role: "Chief AI Architect",
    focus: "Scalability, Latency, Fallbacks & Model Edge Cases",
    avatarColor: "from-indigo-500 to-purple-600",
    description: "Evaluates API resilience, system throughput, and edge-case error handling."
  },
  {
    id: "VC Investor",
    name: "Marcus Sterling",
    role: "Managing Partner, Apex Ventures",
    focus: "Market Size, Competitive Moat & Go-To-Market",
    avatarColor: "from-amber-500 to-orange-600",
    description: "Evaluates unfair advantage, user acquisition, and commercial viability."
  },
  {
    id: "UX Designer",
    name: "Maya Lin",
    role: "Head of Product Design",
    focus: "User Friction, Onboarding & Visual Clarity",
    avatarColor: "from-emerald-500 to-teal-600",
    description: "Evaluates visual clarity, accessibility, and zero-friction interaction."
  },
  {
    id: "Ethics & Impact Expert",
    name: "Prof. Kwame Osei",
    role: "Director of Responsible AI",
    focus: "Data Privacy, Bias Mitigation & Ethical Safety",
    avatarColor: "from-rose-500 to-pink-600",
    description: "Evaluates data protection, safety guardrails, and societal impact."
  }
];

export const JudgeSimulator: React.FC<JudgeSimulatorProps> = ({
  initialTitle = "OmniGuard: Real-Time Deepfake Defense",
  initialDescription = "A live browser extension & AI proxy detecting synthetic audio voice clones and deepfake video streams during critical calls.",
}) => {
  const [projectTitle, setProjectTitle] = useState(initialTitle);
  const [projectDescription, setProjectDescription] = useState(initialDescription);
  const [selectedPersona, setSelectedPersona] = useState(JUDGE_PERSONAS[0]);
  const [userResponse, setUserResponse] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [feedback, setFeedback] = useState<JudgeFeedback | null>(null);

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      const res = await fetch("/api/simulate-judge-qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectTitle,
          projectDescription,
          userResponse,
          judgePersona: selectedPersona.id,
        }),
      });
      const data = await res.json();
      if (data.feedback) {
        setFeedback(data.feedback);
      }
    } catch (err) {
      console.error("Judge simulation failed:", err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Users className="w-3.5 h-3.5" />
          <span>Interactive AI Judge Panel Arena</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Practice Your Pitch Against Real-World Judge Personas
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Test your presentation in a simulated Q&A session. Receive instant scoring across 4 hackathon rubric dimensions, harsh technical critique, and actionable advice before standing in front of real judges this Saturday!
        </p>
      </div>

      {/* Project Context Editor */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          1. Your Project Pitch Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Project Title</label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Elevator Pitch / Tagline</label>
            <input
              type="text"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
        </div>
      </div>

      {/* Select Judge Persona */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 px-1">
          2. Select AI Judge Persona to Question You
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {JUDGE_PERSONAS.map((judge) => {
            const isSelected = selectedPersona.id === judge.id;
            return (
              <div
                key={judge.id}
                onClick={() => setSelectedPersona(judge)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-slate-900 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30"
                    : "bg-slate-900/50 border-slate-800/80 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${judge.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-md`}>
                    {judge.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{judge.name}</h4>
                    <span className="text-[10px] text-amber-300 font-medium block">{judge.role}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight mb-2">
                  {judge.description}
                </p>
                <span className="text-[10px] font-semibold text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 block truncate">
                  Focus: {judge.focus.split(",")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pitch Response Input */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            3. Enter Your Spoken Pitch or Answer Judge Probe
          </h3>
          <span className="text-[10px] text-slate-400">
            Judge: <strong className="text-amber-300">{selectedPersona.name}</strong>
          </span>
        </div>

        <textarea
          value={userResponse}
          onChange={(e) => setUserResponse(e.target.value)}
          placeholder={`e.g. "When a request hits our system, we process it in <100ms by splitting the audio stream into 20ms chunks..."`}
          rows={4}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 resize-none"
        />

        <div className="flex justify-end">
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            <Send className={`w-4 h-4 ${isSimulating ? "animate-spin" : ""}`} />
            <span>{isSimulating ? "Judge Evaluating..." : `Simulate Q&A with ${selectedPersona.name}`}</span>
          </button>
        </div>
      </div>

      {/* Feedback & Scorecard Output */}
      {feedback && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in duration-300">
          {/* Verdict Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Judge Scorecard — {feedback.judgeName}
                </span>
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>Verdict:</span>
                  <span className={`px-2.5 py-0.5 rounded-lg text-xs font-extrabold ${
                    feedback.verdict === "Outstanding" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" :
                    feedback.verdict === "Impressive" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
                    "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  }`}>
                    {feedback.verdict}
                  </span>
                </h3>
              </div>
            </div>

            <div className="text-center bg-slate-950 px-5 py-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Overall Score</span>
              <span className="text-2xl font-extrabold text-amber-400">{feedback.overallScore}/100</span>
            </div>
          </div>

          {/* Rubric Dimension Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(feedback.scoreBreakdown).map(([dim, score]) => (
              <div key={dim} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                  {dim}
                </span>
                <div className="flex items-center justify-between">
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mr-2">
                    <div
                      className="bg-amber-400 h-full rounded-full"
                      style={{ width: `${(Number(score) / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-amber-300 font-mono">{score}/10</span>
                </div>
              </div>
            ))}
          </div>

          {/* Written Feedback */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>Judge Written Feedback</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {feedback.feedback}
            </p>
          </div>

          {/* Tough Follow-Up Probe */}
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
            <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>Next Judge Follow-Up Probe Question</span>
            </h4>
            <p className="text-xs sm:text-sm text-rose-100 font-semibold leading-relaxed">
              "{feedback.followUpQuestion}"
            </p>
          </div>

          {/* Pro Tip */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Pro-Tip to Win Points From Live Judges</span>
            </h4>
            <p className="text-xs text-emerald-100 leading-relaxed font-medium">
              {feedback.proTip}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
