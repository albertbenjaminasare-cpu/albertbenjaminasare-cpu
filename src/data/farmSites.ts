export interface FarmSite {
  id: string;
  name: string;
  stationCode: string;
  region: string;
  country: string;
  countryFlag: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  latLngString: string;
  temperature: number; // in °C
  humidity: number; // in %
  windSpeed: number; // in km/h
  elevationMeters: number;
  dominantCrops: string[];
  activeSporeRisk: "CRITICAL" | "HIGH" | "MODERATE" | "LOW";
  primaryPathogenRisk: string;
  agronomicOfficer: string;
  helpline: string;
  description: string;
}

export const FARM_SITES: FarmSite[] = [
  {
    id: "valley_4b",
    name: "Valley Ag Station",
    stationCode: "GH-EST-4B",
    region: "Eastern Region, Koforidua",
    country: "Ghana",
    countryFlag: "🇬🇭",
    coordinates: { lat: 6.0881, lng: -0.2592 },
    latLngString: "6.0881° N, 0.2592° W",
    temperature: 24,
    humidity: 84,
    windSpeed: 14,
    elevationMeters: 238,
    dominantCrops: ["Cassava", "Tomato", "Plantain", "Cocoa"],
    activeSporeRisk: "CRITICAL",
    primaryPathogenRisk: "Phytophthora infestans (Tomato Blight) & Cassava Mosaic Virus",
    agronomicOfficer: "Dr. Kwabena Mensah (CSIR-CRI)",
    helpline: "+233 24 412 8091",
    description: "Humid forest-transition agricultural zone with elevated fungal spore risk during early morning mist."
  },
  {
    id: "ashanti_cocoa",
    name: "Ashanti Cocoa Belt Station C",
    stationCode: "GH-ASH-03",
    region: "Ashanti Region, Suame / Kumasi",
    country: "Ghana",
    countryFlag: "🇬🇭",
    coordinates: { lat: 6.6885, lng: -1.6244 },
    latLngString: "6.6885° N, 1.6244° W",
    temperature: 26,
    humidity: 91,
    windSpeed: 8,
    elevationMeters: 286,
    dominantCrops: ["Cocoa", "Plantain", "Citrus", "Cocoyam"],
    activeSporeRisk: "CRITICAL",
    primaryPathogenRisk: "Phytophthora megakarya (Cocoa Black Pod Rot)",
    agronomicOfficer: "Ing. Ama Serwaa (CRIG Tafo)",
    helpline: "+233 32 209 4410",
    description: "Dense cocoa canopy with relative humidity frequently exceeding 90%, triggering rapid black pod sporangia germination."
  },
  {
    id: "volta_rice",
    name: "Volta Basin Rice Irrigation Sector 12",
    stationCode: "GH-VLT-12",
    region: "Volta Region, Aveyime / Ho",
    country: "Ghana",
    countryFlag: "🇬🇭",
    coordinates: { lat: 6.6101, lng: 0.4785 },
    latLngString: "6.6101° N, 0.4785° E",
    temperature: 29,
    humidity: 78,
    windSpeed: 22,
    elevationMeters: 42,
    dominantCrops: ["Paddy Rice", "Maize", "Okra", "Chili Pepper"],
    activeSporeRisk: "HIGH",
    primaryPathogenRisk: "Magnaporthe oryzae (Rice Blast / Blight)",
    agronomicOfficer: "Agron. Selorm Kpodo (GIDA)",
    helpline: "+233 20 811 3920",
    description: "Lowland irrigated rice perimeter where coastal wind vectors disperse airborne rice blast spores across paddies."
  },
  {
    id: "tamale_savanna",
    name: "Northern Savanna Grain Belt Plot A",
    stationCode: "GH-NR-01A",
    region: "Northern Region, Tamale / Nyankpala",
    country: "Ghana",
    countryFlag: "🇬🇭",
    coordinates: { lat: 9.4008, lng: -0.8393 },
    latLngString: "9.4008° N, 0.8393° W",
    temperature: 34,
    humidity: 58,
    windSpeed: 28,
    elevationMeters: 180,
    dominantCrops: ["Maize", "Sorghum", "Cowpea", "Yam", "Groundnut"],
    activeSporeRisk: "MODERATE",
    primaryPathogenRisk: "Puccinia sorghi (Maize Common Rust) & Striga Asiatica",
    agronomicOfficer: "Dr. Ibrahim Yakubu (SARI Nyankpala)",
    helpline: "+233 37 202 2411",
    description: "Dry Guinea savanna zone with high solar radiation and thermal winds dispersing airborne rust pustules."
  },
  {
    id: "sanpedro_cocoa",
    name: "San-Pédro Cocoa Triangle Zone 3",
    stationCode: "CI-BAS-03",
    region: "Bas-Sassandra District",
    country: "Côte d'Ivoire",
    countryFlag: "🇨🇮",
    coordinates: { lat: 4.7485, lng: -6.6363 },
    latLngString: "4.7485° N, 6.6363° W",
    temperature: 27,
    humidity: 89,
    windSpeed: 12,
    elevationMeters: 30,
    dominantCrops: ["Cocoa", "Coffee", "Rubber", "Oil Palm"],
    activeSporeRisk: "CRITICAL",
    primaryPathogenRisk: "Phytophthora palmivora & Swollen Shoot Virus",
    agronomicOfficer: "Dr. Jean-Baptiste Koffi (CNRA)",
    helpline: "+225 07 08 22 19",
    description: "Major West African cocoa corridor with intense coastal humidity fostering fungal pod rot outbreaks."
  },
  {
    id: "eldoret_rift",
    name: "Rift Valley Maize & Horticulture Plot 8",
    stationCode: "KE-RIFT-08",
    region: "Uasin Gishu / Eldoret",
    country: "Kenya",
    countryFlag: "🇰🇪",
    coordinates: { lat: 0.5143, lng: 35.2698 },
    latLngString: "0.5143° N, 35.2698° E",
    temperature: 21,
    humidity: 72,
    windSpeed: 18,
    elevationMeters: 2095,
    dominantCrops: ["Maize", "Irish Potato", "Wheat", "Tea"],
    activeSporeRisk: "MODERATE",
    primaryPathogenRisk: "Puccinia graminis (Stem Rust) & Phytophthora infestans",
    agronomicOfficer: "Agron. Faith Kipchumba (KALRO)",
    helpline: "+254 722 00 1122",
    description: "Highland agricultural ecosystem with cooler temperatures that prolong spore incubation windows on potato and cereal leaves."
  },
  {
    id: "dakar_gardens",
    name: "Niayes Coastal Market Gardens Zone B",
    stationCode: "SN-DKR-02",
    region: "Niayes Belt, Dakar",
    country: "Senegal",
    countryFlag: "🇸🇳",
    coordinates: { lat: 14.7167, lng: -17.4677 },
    latLngString: "14.7167° N, 17.4677° W",
    temperature: 28,
    humidity: 76,
    windSpeed: 31,
    elevationMeters: 15,
    dominantCrops: ["Tomato", "Onion", "Cabbage", "Pepper"],
    activeSporeRisk: "HIGH",
    primaryPathogenRisk: "Alternaria solani (Early Blight) & Xanthomonas",
    agronomicOfficer: "Dr. Ousmane Diop (ISRA)",
    helpline: "+221 33 832 1010",
    description: "Coastal vegetable farming belt exposed to saline Atlantic breezes and high night moisture."
  }
];

// Helper function to find the closest farm site from given lat/lng coordinates
export function getClosestFarmSite(lat: number, lng: number): FarmSite {
  let closest = FARM_SITES[0];
  let minDistance = Number.MAX_VALUE;

  FARM_SITES.forEach((site) => {
    // Haversine distance estimation
    const dLat = (site.coordinates.lat - lat) * (Math.PI / 180);
    const dLng = (site.coordinates.lng - lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat * (Math.PI / 180)) *
        Math.cos(site.coordinates.lat * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = 6371 * c; // Earth radius in km

    if (d < minDistance) {
      minDistance = d;
      closest = site;
    }
  });

  return closest;
}
