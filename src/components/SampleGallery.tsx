import React, { useState } from "react";
import { Download, Camera, CheckCircle2, AlertTriangle, Filter, Sparkles, Image as ImageIcon } from "lucide-react";
import { CROP_20_SAMPLES, CropSampleItem } from "../data/cropSamples";

interface SampleGalleryProps {
  onSelectSampleForScan: (sample: CropSampleItem) => void;
}

export const SampleGallery: React.FC<SampleGalleryProps> = ({ onSelectSampleForScan }) => {
  const [filter, setFilter] = useState<"all" | "spoiled" | "healthy">("all");
  const [selectedCropType, setSelectedCropType] = useState<string>("all");

  // Get unique crop types
  const cropTypes = Array.from(new Set(CROP_20_SAMPLES.map((s) => s.crop)));

  const filteredSamples = CROP_20_SAMPLES.filter((sample) => {
    if (filter === "spoiled" && sample.category !== "spoiled") return false;
    if (filter === "healthy" && sample.category !== "healthy") return false;
    if (selectedCropType !== "all" && sample.crop !== selectedCropType) return false;
    return true;
  });

  const downloadImage = (sample: CropSampleItem) => {
    const link = document.createElement("a");
    link.href = sample.imageUrl;
    link.download = `${sample.id}_${sample.category}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllAsZipOrBatch = () => {
    // Download all currently visible filtered images sequentially
    filteredSamples.forEach((sample, index) => {
      setTimeout(() => {
        downloadImage(sample);
      }, index * 250);
    });
  };

  return (
    <div className="space-y-6 bg-slate-900/90 border border-emerald-500/30 p-6 rounded-2xl shadow-2xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <ImageIcon className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              20 Crop Test Photos (Download & Scan)
            </h2>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono font-bold">
              10 Spoiled • 10 Healthy
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Download high-resolution crop photos directly to your local machine, or click any image to scan instantly in AgriVision AI.
          </p>
        </div>

        {/* Batch Download Button */}
        <button
          onClick={downloadAllAsZipOrBatch}
          className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download All {filteredSamples.length} Photos</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-slate-300">Filter Status:</span>
          
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              filter === "all"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All 20 Photos
          </button>

          <button
            onClick={() => setFilter("spoiled")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              filter === "spoiled"
                ? "bg-red-500/20 text-red-300 border border-red-500/40"
                : "text-slate-400 hover:text-red-300"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>10 Spoiled / Diseased</span>
          </button>

          <button
            onClick={() => setFilter("healthy")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              filter === "healthy"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "text-slate-400 hover:text-emerald-300"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>10 Healthy Crops</span>
          </button>
        </div>

        {/* Filter by Crop Category */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-semibold">Crop Type:</span>
          <select
            value={selectedCropType}
            onChange={(e) => setSelectedCropType(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold rounded-lg px-3 py-1 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Crops ({CROP_20_SAMPLES.length})</option>
            {cropTypes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of 20 Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredSamples.map((sample) => {
          const isSpoiled = sample.category === "spoiled";
          return (
            <div
              key={sample.id}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                isSpoiled
                  ? "bg-slate-950/80 border-red-500/30 hover:border-red-500/60 shadow-lg shadow-red-950/20"
                  : "bg-slate-950/80 border-emerald-500/30 hover:border-emerald-500/60 shadow-lg shadow-emerald-950/20"
              }`}
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={sample.imageUrl}
                  alt={sample.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge Overlay */}
                <div className="absolute top-2 left-2 flex items-center space-x-1">
                  <span
                    className={`text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full border shadow-md font-mono ${
                      isSpoiled
                        ? "bg-red-950/90 text-red-300 border-red-500/50"
                        : "bg-emerald-950/90 text-emerald-300 border-emerald-500/50"
                    }`}
                  >
                    {isSpoiled ? "⚠️ Spoiled / Diseased" : "✨ 100% Healthy"}
                  </span>
                </div>

                <div className="absolute top-2 right-2">
                  <span className="text-[9px] bg-slate-900/90 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-md font-mono">
                    {sample.crop}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                    {sample.name}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {sample.badge}
                  </p>
                  <p className="text-[11px] text-slate-300 line-clamp-2 mt-1.5 leading-tight">
                    {sample.description}
                  </p>
                </div>

                {/* Action Buttons: Download & Scan */}
                <div className="pt-2 flex items-center gap-2 border-t border-slate-800/80">
                  <button
                    onClick={() => downloadImage(sample)}
                    className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
                    title={`Download ${sample.name} image file to local machine`}
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Download</span>
                  </button>

                  <button
                    onClick={() => onSelectSampleForScan(sample)}
                    className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all shadow-sm"
                    title="Load and scan this sample photo in AgriVision AI"
                  >
                    <Camera className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Scan Now</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
