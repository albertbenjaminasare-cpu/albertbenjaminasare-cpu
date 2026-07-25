import React, { useState, useRef, useEffect } from "react";
import {
  Sprout,
  Camera,
  MessageSquare,
  CloudRain,
  Calculator,
  FileSpreadsheet,
  MapPin,
  Thermometer,
  Zap,
  ChevronDown,
  Navigation,
  Globe,
  Droplets,
  Check
} from "lucide-react";
import { FarmSite, FARM_SITES } from "../data/farmSites";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedSite: FarmSite;
  onSelectSite: (site: FarmSite) => void;
  onDetectGps: () => void;
  isLocatingGps: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedSite,
  onSelectSite,
  onDetectGps,
  isLocatingGps
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: "scanner", label: "Pathology Vision Scanner", icon: Camera, badge: "Gemma 4 / Vision" },
    { id: "advisor", label: "AI Agronomist Chat", icon: MessageSquare, badge: "Interactive" },
    { id: "outbreak", label: "Microclimate Spore Radar", icon: CloudRain, badge: "Weather Risk" },
    { id: "dosage", label: "Dosage & ROI Calculator", icon: Calculator, badge: "Farm Scale" },
    { id: "records", label: "Field Scan Records", icon: FileSpreadsheet, badge: "Logs" },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-emerald-500/20 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Branding & Field Telemetry Row */}
        <div className="flex flex-col md:flex-row items-center justify-between py-3 border-b border-slate-800/80 gap-3">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("scanner")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sprout className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent">
                  AgriVision
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  AI Plant Pathology
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Smart Crop Health & Multimodal Field Diagnostic Platform
              </p>
            </div>
          </div>

          {/* Dynamic Multi-Site GPS Location Selector & Real-Time Telemetry */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Interactive Location Dropdown Switcher */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-emerald-500/40 text-slate-200 transition-all shadow-md group"
                title="Click to switch farm station location across Africa or detect GPS"
              >
                <div className="flex items-center space-x-1.5">
                  <span className="text-sm">{selectedSite.countryFlag}</span>
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-emerald-300">{selectedSite.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">({selectedSite.stationCode})</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-80 sm:w-96 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl z-50 p-3 space-y-2 max-h-[80vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 px-1">
                    <div className="flex items-center space-x-1.5 text-slate-300 font-bold text-xs">
                      <Globe className="w-4 h-4 text-emerald-400" />
                      <span>African Ag Station Network</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      7 Regional Hubs
                    </span>
                  </div>

                  {/* Top GPS Auto-Detect Button */}
                  <button
                    onClick={() => {
                      onDetectGps();
                      setIsDropdownOpen(false);
                    }}
                    disabled={isLocatingGps}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all group"
                  >
                    <div className="flex items-center space-x-2">
                      <Navigation className={`w-4 h-4 text-emerald-400 ${isLocatingGps ? "animate-spin" : "group-hover:scale-110"} transition-transform`} />
                      <span>{isLocatingGps ? "Detecting Satellite GPS..." : "🎯 Auto-Detect My Phone GPS Coords"}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400">Geolocation API</span>
                  </button>

                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 pt-1">
                    Select Ag Station / Farm Site
                  </div>

                  {/* List of Stations */}
                  <div className="space-y-1">
                    {FARM_SITES.map((site) => {
                      const isSelected = selectedSite.id === site.id;
                      return (
                        <button
                          key={site.id}
                          onClick={() => {
                            onSelectSite(site);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start justify-between ${
                            isSelected
                              ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 font-bold shadow-sm"
                              : "hover:bg-slate-900 text-slate-300 border border-transparent"
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-1.5">
                              <span className="text-sm">{site.countryFlag}</span>
                              <span className="font-bold">{site.name}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 inline" />}
                            </div>
                            <p className="text-[10px] text-slate-400">{site.region}</p>
                            <div className="flex items-center gap-2 pt-0.5 text-[9.5px] text-slate-400 font-mono">
                              <span>📍 {site.latLngString}</span>
                              <span>•</span>
                              <span className="text-emerald-400 font-semibold">{site.temperature}°C</span>
                              <span>•</span>
                              <span className="text-teal-400 font-semibold">{site.humidity}% RH</span>
                            </div>
                          </div>
                          <span
                            className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                              site.activeSporeRisk === "CRITICAL"
                                ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                                : site.activeSporeRisk === "HIGH"
                                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                                : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                            }`}
                          >
                            {site.activeSporeRisk}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Microclimate Telemetry Pill */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
              <Thermometer className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-medium">{selectedSite.temperature}°C</span>
              <span className="text-slate-600">•</span>
              <Droplets className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-medium">{selectedSite.humidity}% RH</span>
            </div>

            {/* Model Badge */}
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-mono">
              <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Gemma 4 Multimodal</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Row */}
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2.5 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-md font-mono ${
                      isActive
                        ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                        : "bg-slate-800/80 text-slate-400 border border-slate-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};


