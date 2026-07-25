import { Document, Packer, Paragraph, TextRun, HeadingLevel, ExternalHyperlink, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import { AgriVisionAnalysis } from "../types";
import { FarmSite } from "../data/farmSites";
import { getProjectAppUrl } from "./pdfExport";

export interface DocxExportOptions {
  analysis?: AgriVisionAnalysis | null;
  selectedSite?: FarmSite;
  selectedVoice?: string;
  selectedLang?: string;
  customTitle?: string;
}

export const exportAgriVisionDocxReport = async (options: DocxExportOptions = {}) => {
  const {
    analysis,
    selectedSite,
    selectedVoice = "Garnet",
    selectedLang = "twi",
    customTitle = "AgriVision AI — Plant Pathology & Farm Audit Report"
  } = options;

  const appUrl = getProjectAppUrl();
  const timestamp = new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "medium" });

  const children: any[] = [
    // Header & Title
    new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [
        new TextRun({
          text: "AgriVision AI Studio",
          bold: true,
          size: 36,
          color: "0F172A"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "Gemma 4 Multimodal Crop Health & Pathology Report",
          bold: true,
          size: 24,
          color: "10B981"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Generated: ${timestamp}`,
          italics: true,
          size: 18,
          color: "64748B"
        })
      ]
    }),
    new Paragraph({ text: "" }), // Spacing

    // --- CRITICAL: LIVE APPLICATION LINK BOX IN WORD ---
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 12, color: "10B981" },
                bottom: { style: BorderStyle.SINGLE, size: 12, color: "10B981" },
                left: { style: BorderStyle.SINGLE, size: 12, color: "10B981" },
                right: { style: BorderStyle.SINGLE, size: 12, color: "10B981" }
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "LIVE PROJECT & DEMO APPLICATION LINK:",
                      bold: true,
                      size: 20,
                      color: "065F46"
                    })
                  ]
                }),
                new Paragraph({
                  children: [
                    new ExternalHyperlink({
                      link: appUrl,
                      children: [
                        new TextRun({
                          text: appUrl,
                          bold: true,
                          size: 22,
                          color: "10B981",
                          underline: {}
                        })
                      ]
                    })
                  ]
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Click the URL above to access the live interactive application running on AI Studio / GitHub.",
                      italics: true,
                      size: 16,
                      color: "64748B"
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    }),

    new Paragraph({ text: "" }), // Spacing

    // 1. Model & Station Telemetry Section
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [
        new TextRun({ text: "1. AI Engine & Microclimate Telemetry", bold: true, color: "0F172A" })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Primary Vision Engine: ", bold: true }),
        new TextRun({ text: "Gemma 4 Multimodal Crop Pathology (gemma-4-26b-a4b-it)" })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Audio Voice Engine: ", bold: true }),
        new TextRun({ text: `Local Dialect Voice (${selectedVoice} Persona) • ${selectedLang.toUpperCase()} Dialect` })
      ]
    })
  ];

  if (selectedSite) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "Farm Station: ", bold: true }),
          new TextRun({ text: `${selectedSite.name} (${selectedSite.region}, ${selectedSite.countryFlag}) — Lat/Lng: ${selectedSite.latLngString}` })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Microclimate Telemetry: ", bold: true }),
          new TextRun({ text: `Temp: ${selectedSite.temperature}°C | Humidity: ${selectedSite.humidity}% RH | Spore Risk: ${selectedSite.activeSporeRisk}` })
        ]
      })
    );
  }

  children.push(new Paragraph({ text: "" }));

  // 2. Pathology Analysis Results
  if (analysis) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [
          new TextRun({ text: "2. Crop Pathology Diagnostic Results", bold: true, color: "0F172A" })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: `Diagnosis: ${analysis.cropCategory} — ${analysis.diseaseName}`, bold: true, size: 24, color: "0F172A" })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: `Diagnostic Confidence: ${analysis.confidenceScore}% | Severity: ${(analysis.severityLevel || "Moderate").toUpperCase()}`, bold: true, color: "10B981" })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: `Projected Yield Loss Prevention: ${analysis.estimatedEconomicLossPrevention}`, italics: true, color: "475569" })
        ]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: "Observed Symptoms:", bold: true })]
      })
    );

    analysis.primarySymptoms.forEach((s) => {
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          children: [new TextRun({ text: s })]
        })
      );
    });

    children.push(
      new Paragraph({ text: "" }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: "Immediate Organic Remedy:", bold: true, color: "10B981" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: analysis.immediateOrganicRemedy })]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: "Targeted Chemical Treatment Schedule:", bold: true, color: "4F46E5" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: analysis.chemicalTreatment })]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: "Spoken Local Dialect Audio Script:", bold: true })]
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `"${analysis.multilingualAudioScript[selectedLang] || analysis.multilingualAudioScript.en || analysis.multilingualAudioScript.twi}"`,
            italics: true,
            color: "334155"
          })
        ]
      })
    );
  }

  // Footer / Project Note
  children.push(
    new Paragraph({ text: "" }),
    new Paragraph({
      children: [
        new TextRun({
          text: "— AgriVision AI Studio • Official Field Pathology Artifact —",
          bold: true,
          size: 16,
          color: "64748B"
        })
      ]
    })
  );

  const doc = new Document({
    sections: [{ properties: {}, children }]
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `AgriVision_Crop_Report_${Date.now()}.docx`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportPitchDeckDocxReport = async (
  projectTitle: string,
  projectDesc: string,
  track: string,
  slides: any[]
) => {
  const appUrl = getProjectAppUrl();
  const timestamp = new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "medium" });

  const children: any[] = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [new TextRun({ text: projectTitle || "Project Pitch Deck", bold: true, size: 36, color: "0F172A" })]
    }),
    new Paragraph({
      children: [new TextRun({ text: `Track: ${track} | 3-Minute Presentation Deck`, bold: true, size: 22, color: "D97706" })]
    }),
    new Paragraph({
      children: [new TextRun({ text: `Generated: ${timestamp}`, italics: true, size: 18, color: "64748B" })]
    }),
    new Paragraph({ text: "" }),

    // Live App Link Box
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 12, color: "F59E0B" },
                bottom: { style: BorderStyle.SINGLE, size: 12, color: "F59E0B" },
                left: { style: BorderStyle.SINGLE, size: 12, color: "F59E0B" },
                right: { style: BorderStyle.SINGLE, size: 12, color: "F59E0B" }
              },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: "LIVE PROJECT DEMO & SOURCE LINK:", bold: true, size: 20, color: "92400E" })]
                }),
                new Paragraph({
                  children: [
                    new ExternalHyperlink({
                      link: appUrl,
                      children: [new TextRun({ text: appUrl, bold: true, size: 22, color: "D97706", underline: {} })]
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    }),
    new Paragraph({ text: "" })
  ];

  slides.forEach((s) => {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: `Slide ${s.slideNumber}: ${s.title}`, bold: true, color: "0F172A" })]
      }),
      new Paragraph({
        children: [new TextRun({ text: s.subtitle || "", italics: true, color: "64748B" })]
      })
    );

    (s.bulletPoints || []).forEach((bp: string) => {
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          children: [new TextRun({ text: bp })]
        })
      );
    });

    children.push(
      new Paragraph({
        children: [new TextRun({ text: `Spoken Script: "${s.speakerNote || ""}"`, bold: true, color: "B45309" })]
      }),
      new Paragraph({ text: "" })
    );
  });

  const doc = new Document({
    sections: [{ properties: {}, children }]
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${projectTitle.replace(/\s+/g, "_")}_Pitch_Deck.docx`;
  a.click();
  URL.revokeObjectURL(url);
};
