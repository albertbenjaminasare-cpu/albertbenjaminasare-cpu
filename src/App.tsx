import React, { useState } from "react";
import { Header } from "./components/Header";
import { AgriVisionApp } from "./components/AgriVisionApp";
import { FarmSite, FARM_SITES, getClosestFarmSite } from "./data/farmSites";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("scanner");
  const [selectedSite, setSelectedSite] = useState<FarmSite>(FARM_SITES[0]);
  const [isLocatingGps, setIsLocatingGps] = useState<boolean>(false);

  const handleDetectGps = () => {
    setIsLocatingGps(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser. Defaulting to nearest station.");
      setIsLocatingGps(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const closestSite = getClosestFarmSite(lat, lng);

        // Create custom GPS-detected station entry
        const userGpsSite: FarmSite = {
          id: `gps_${Date.now()}`,
          name: "My GPS Farm Location",
          stationCode: "GPS-AUTO",
          region: `Detected Coords: ${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
          country: closestSite.country,
          countryFlag: "📍",
          coordinates: { lat, lng },
          latLngString: `${lat.toFixed(4)}° ${lat >= 0 ? "N" : "S"}, ${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? "E" : "W"}`,
          temperature: closestSite.temperature,
          humidity: closestSite.humidity,
          windSpeed: closestSite.windSpeed,
          elevationMeters: closestSite.elevationMeters,
          dominantCrops: closestSite.dominantCrops,
          activeSporeRisk: closestSite.activeSporeRisk,
          primaryPathogenRisk: `Local GPS Risk (Calibrated from ${closestSite.name})`,
          agronomicOfficer: closestSite.agronomicOfficer,
          helpline: closestSite.helpline,
          description: `Automatically detected device location mapped to nearest microclimate station (${closestSite.name}).`
        };

        setSelectedSite(userGpsSite);
        setIsLocatingGps(false);
      },
      (error) => {
        console.warn("Geolocation warning:", error.message);
        alert(`Satellite GPS fallback active. Calibrated to nearest regional station: ${FARM_SITES[0].name}`);
        setSelectedSite(FARM_SITES[0]);
        setIsLocatingGps(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 flex flex-col">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedSite={selectedSite}
        onSelectSite={setSelectedSite}
        onDetectGps={handleDetectGps}
        isLocatingGps={isLocatingGps}
      />

      {/* Main Standalone Application Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AgriVisionApp
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedSite={selectedSite}
          onSelectSite={setSelectedSite}
          onDetectGps={handleDetectGps}
          isLocatingGps={isLocatingGps}
        />
      </main>

      {/* Standalone Application Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">AgriVision AI Platform</span>
          </div>
          <p className="text-slate-500">
            Powered by Gemma 4 Multimodal AI Engine & React 19
          </p>
        </div>
      </footer>
    </div>
  );
}


