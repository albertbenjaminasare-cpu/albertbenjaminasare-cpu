import { jsPDF } from "jspdf";
import { AgriVisionAnalysis } from "../types";
import { FarmSite } from "../data/farmSites";

export interface PDFExportOptions {
  analysis?: AgriVisionAnalysis | null;
  selectedSite?: FarmSite;
  selectedVoice?: string;
  selectedLang?: string;
  customTitle?: string;
}

export const getProjectAppUrl = (): string => {
  if (typeof window !== "undefined" && window.location && window.location.href) {
    // If running in development preview, prefer the published shared URL or current location
    const current = window.location.href;
    if (current.includes("ais-dev-")) {
      return current.replace("ais-dev-", "ais-pre-");
    }
    return current;
  }
  return "https://ais-pre-2voxnaqp5asku5mx3t6z46-424143059917.europe-west2.run.app";
};

export const exportAgriVisionPDFReport = (options: PDFExportOptions = {}) => {
  const {
    analysis,
    selectedSite,
    selectedVoice = "Garnet",
    selectedLang = "twi",
    customTitle = "AgriVision AI — Plant Pathology & Farm Audit Report"
  } = options;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const appUrl = getProjectAppUrl();
  const timestamp = new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "medium" });

  // Page Colors & Header Styling
  const primaryEmerald = [16, 185, 129]; // #10b981
  const darkSlate = [15, 23, 42]; // #0f172a
  const textDark = [30, 41, 59];
  const mutedText = [100, 116, 139];

  // Header Banner Background
  doc.setFillColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.rect(0, 0, 210, 42, "F");

  // Header Accent Stripe
  doc.setFillColor(primaryEmerald[0], primaryEmerald[1], primaryEmerald[2]);
  doc.rect(0, 40, 210, 2, "F");

  // Title Text
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("AgriVision AI Studio", 14, 16);

  doc.setFontSize(11);
  doc.setTextColor(52, 211, 153); // Emerald-400
  doc.text("Gemma 4 Multimodal Crop Health & Pathology Report", 14, 24);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  doc.text(`Generated: ${timestamp}`, 14, 32);

  // --- PROJECT LINK BOX (CRITICAL REQUIREMENTS) ---
  let y = 48;

  doc.setFillColor(240, 253, 244); // Light emerald green fill
  doc.setDrawColor(16, 185, 129); // Emerald border
  doc.setLineWidth(0.5);
  doc.roundedRect(14, y, 182, 22, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(6, 95, 70); // Dark emerald green text
  doc.text("LIVE PROJECT & DEMO APPLICATION LINK:", 18, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(16, 185, 129);
  
  // Print URL as clickable hyperlink in PDF
  doc.textWithLink(appUrl, 18, y + 13, { url: appUrl });
  
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("Share this PDF or click the URL above to open the live interactive application on AI Studio / GitHub.", 18, y + 18);

  y += 28;

  // --- MODEL & ARCHITECTURE METADATA ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text("1. AI Engine & Microclimate Telemetry", 14, y);

  y += 4;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(14, y, 196, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);

  doc.setFont("helvetica", "bold");
  doc.text("Primary Vision Model:", 14, y);
  doc.setFont("helvetica", "normal");
  doc.text("Gemma 4 Multimodal Crop Vision (gemma-4-26b-a4b-it)", 55, y);

  y += 5.5;
  doc.setFont("helvetica", "bold");
  doc.text("Audio Voice Engine:", 14, y);
  doc.setFont("helvetica", "normal");
  doc.text(`Local Dialect Voice (${selectedVoice} Persona) • ${selectedLang.toUpperCase()} Dialect`, 55, y);

  if (selectedSite) {
    y += 5.5;
    doc.setFont("helvetica", "bold");
    doc.text("Farm Ag Station:", 14, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${selectedSite.name} (${selectedSite.region}, ${selectedSite.countryFlag}) — Lat/Lng: ${selectedSite.latLngString}`, 55, y);

    y += 5.5;
    doc.setFont("helvetica", "bold");
    doc.text("Microclimate Metrics:", 14, y);
    doc.setFont("helvetica", "normal");
    doc.text(`Temp: ${selectedSite.temperature}°C | Humidity: ${selectedSite.humidity}% RH | Spore Risk: ${selectedSite.activeSporeRisk}`, 55, y);
  }

  y += 10;

  // --- DIAGNOSTIC ANALYSIS RESULTS ---
  if (analysis) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    doc.text("2. Crop Pathology Diagnostic Results", 14, y);

    y += 4;
    doc.setDrawColor(226, 232, 240);
    doc.line(14, y, 196, y);
    y += 6;

    // Diagnostic Card Box
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(14, y, 182, 34, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(`${analysis.cropCategory} — ${analysis.diseaseName}`, 18, y + 8);

    doc.setFontSize(9);
    doc.setTextColor(16, 185, 129);
    doc.text(`Diagnosis Confidence: ${analysis.confidenceScore}%`, 18, y + 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Crop Category: ${analysis.cropCategory} | Severity Level: ${(analysis.severityLevel || "Moderate").toUpperCase()}`, 18, y + 21);
    doc.text(`Projected Economic Yield Loss Prevented: ${analysis.estimatedEconomicLossPrevention}`, 18, y + 27);

    y += 40;

    // Identified Symptoms Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    doc.text("Primary Pathology Symptoms:", 14, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    analysis.primarySymptoms.forEach((symptom) => {
      doc.text(`• ${symptom}`, 18, y);
      y += 4.5;
    });

    y += 4;

    // Organic Remedy & Chemical Treatment Box
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(16, 185, 129);
    doc.text("Immediate Organic Remedy:", 14, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    const organicLines = doc.splitTextToSize(analysis.immediateOrganicRemedy, 178);
    doc.text(organicLines, 18, y);
    y += organicLines.length * 4.5 + 4;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(79, 70, 229); // Indigo
    doc.text("Targeted Chemical Treatment Schedule:", 14, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    const chemLines = doc.splitTextToSize(analysis.chemicalTreatment, 178);
    doc.text(chemLines, 18, y);
    y += chemLines.length * 4.5 + 6;

    // Spoken Script Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    doc.text("Spoken Local Dialect Audio Script:", 14, y);
    y += 5;

    const scriptText = analysis.multilingualAudioScript[selectedLang] || analysis.multilingualAudioScript.en || analysis.multilingualAudioScript.twi;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const scriptLines = doc.splitTextToSize(`"${scriptText}"`, 178);
    doc.text(scriptLines, 18, y);
    y += scriptLines.length * 4.2 + 8;
  }

  // --- FOOTER & SIGNATURE ---
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFillColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.rect(0, pageHeight - 16, 210, 16, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text("AgriVision AI Studio — Official Project Defense & Field Pathology Artifact", 14, pageHeight - 9);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(52, 211, 153);
  doc.textWithLink(appUrl, 14, pageHeight - 4, { url: appUrl });

  // Save the generated PDF file
  const filename = `AgriVision_Crop_Report_${Date.now()}.pdf`;
  doc.save(filename);
};

export const exportPitchDeckPDFReport = (projectTitle: string, projectDesc: string, track: string, slides: any[]) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const appUrl = getProjectAppUrl();
  const timestamp = new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "medium" });

  const darkSlate = [15, 23, 42];
  const textDark = [30, 41, 59];

  // Title Banner
  doc.setFillColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.rect(0, 0, 210, 40, "F");

  doc.setFillColor(245, 158, 11); // Amber
  doc.rect(0, 38, 210, 2, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(projectTitle || "Project Pitch Deck", 14, 16);

  doc.setFontSize(10);
  doc.setTextColor(253, 230, 138); // Amber-200
  doc.text(`Track: ${track} | 3-Minute Competition Presentation Deck`, 14, 24);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text(`Generated: ${timestamp}`, 14, 32);

  let y = 46;

  // Project URL Box
  doc.setFillColor(254, 243, 199); // Amber tint
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.5);
  doc.roundedRect(14, y, 182, 20, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(146, 64, 14);
  doc.text("PROJECT LIVE DEMO & SOURCE LINK:", 18, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(217, 119, 6);
  doc.textWithLink(appUrl, 18, y + 13, { url: appUrl });

  y += 26;

  // Slides Loop
  slides.forEach((slide, idx) => {
    if (y > 230) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(14, y, 182, 42, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(`Slide ${slide.slideNumber}: ${slide.title}`, 18, y + 7);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(slide.subtitle || "", 18, y + 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    
    let bulletY = y + 18;
    (slide.bulletPoints || []).forEach((bp: string) => {
      doc.text(`• ${bp}`, 20, bulletY);
      bulletY += 4.5;
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(180, 83, 9);
    doc.text(`Spoken Script: "${slide.speakerNote || ""}"`, 18, y + 36);

    y += 48;
  });

  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFillColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.rect(0, pageHeight - 14, 210, 14, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(`${projectTitle} — Project Pitch Deck Report`, 14, pageHeight - 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(252, 211, 77);
  doc.textWithLink(appUrl, 130, pageHeight - 6, { url: appUrl });

  doc.save(`${projectTitle.replace(/\s+/g, "_")}_Pitch_Deck.pdf`);
};
