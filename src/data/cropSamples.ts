export interface CropSampleItem {
  id: string;
  name: string;
  crop: string;
  condition: string;
  badge: string;
  severity: "High" | "Moderate" | "Low" | "Healthy";
  isHealthy: boolean;
  category: "spoiled" | "healthy";
  imageUrl: string;
  description: string;
  recommendedAction: string;
}

// 20 High-Quality Real Photographic Crop Pathology & Healthy Samples (10 Spoiled + 10 Healthy)
export const CROP_20_SAMPLES: CropSampleItem[] = [
  // --- 10 SPOILED / DISEASED CROPS ---
  {
    id: "cassava_mosaic",
    name: "Cassava Mosaic Disease",
    crop: "Cassava",
    condition: "Chlorotic Yellow Mottling & Leaf Distortion",
    badge: "African Cassava Mosaic Virus",
    severity: "High",
    isHealthy: false,
    category: "spoiled",
    imageUrl: "/samples/cassava_mosaic.jpg",
    description: "Yellow chlorotic patches, twisted leaflets, stunted growth caused by whiteflies.",
    recommendedAction: "Rogue & burn infected plants. Replant with certified ACMV-resistant cuttings."
  },
  {
    id: "tomato_blight",
    name: "Tomato Late Blight",
    crop: "Tomato",
    condition: "Water-Soaked Dark Lesions & Spore Halos",
    badge: "Phytophthora infestans",
    severity: "High",
    isHealthy: false,
    category: "spoiled",
    imageUrl: "/samples/tomato_blight.jpg",
    description: "Rapidly spreading dark brown water-soaked leaf spots with white sporangia.",
    recommendedAction: "Apply copper fungicide or mancozeb every 5-7 days under wet weather."
  },
  {
    id: "corn_rust",
    name: "Maize Common Rust",
    crop: "Corn / Maize",
    condition: "Cinnamon-Brown Powdery Pustules",
    badge: "Puccinia sorghi",
    severity: "Moderate",
    isHealthy: false,
    category: "spoiled",
    imageUrl: "/samples/corn_rust.jpg",
    description: "Brownish-red pustules on upper and lower foliage reducing grain fill.",
    recommendedAction: "Spray triazole fungicide at first tasseling; switch to rust-resistant hybrids."
  },
  {
    id: "cocoa_black_pod",
    name: "Cocoa Black Pod Rot",
    crop: "Cocoa",
    condition: "Dark Brown Pod Decay & Fungal Bloom",
    badge: "Phytophthora palmivora",
    severity: "High",
    isHealthy: false,
    category: "spoiled",
    imageUrl: "/samples/cocoa_black_pod.jpg",
    description: "Spreading chocolate-brown decay on cocoa pods turning black with white spores.",
    recommendedAction: "Remove infected mummified pods weekly; spray copper hydroxides before rainy season."
  },
  {
    id: "rice_blight",
    name: "Rice Bacterial Leaf Blight",
    crop: "Rice",
    condition: "Wavy Yellow-White Margin Lesions",
    badge: "Xanthomonas oryzae",
    severity: "High",
    isHealthy: false,
    category: "spoiled",
    imageUrl: "/samples/rice_blight.jpg",
    description: "Yellowish-white wavy wilting stripes running down leaf blades.",
    recommendedAction: "Avoid excessive nitrogen fertilizer; ensure field drainage and copper bactericide spray."
  },
  {
    id: "potato_early_blight",
    name: "Potato Early Blight",
    crop: "Potato",
    condition: "Concentric Ring 'Target-Spot' Lesions",
    badge: "Alternaria solani",
    severity: "Moderate",
    isHealthy: false,
    category: "spoiled",
    imageUrl: "/samples/potato_early_blight.jpg",
    description: "Target-board circular dark brown leaf spots with yellow halo chlorosis.",
    recommendedAction: "Apply Chlorothalonil or Mancozeb fungicide; practice 3-year crop rotation."
  },
  {
    id: "banana_sigatoka",
    name: "Banana Black Sigatoka",
    crop: "Banana",
    condition: "Dark Reddish-Brown Necrotic Streaks",
    badge: "Mycosphaerella fijiensis",
    severity: "High",
    isHealthy: false,
    category: "spoiled",
    imageUrl: "/samples/banana_sigatoka.jpg",
    description: "Red-brown specks widening into dark necrotic blights on broad banana leaves.",
    recommendedAction: "De-leaf severely affected leaves; apply systemic mineral oil fungicide spray."
  },
  {
    id: "pepper_anthracnose",
    name: "Pepper Anthracnose Fruit Rot",
    crop: "Pepper",
    condition: "Sunken Dark Fruit Rot & Pink Spore Rings",
    badge: "Colletotrichum capsici",
    severity: "High",
    isHealthy: false,
    category: "spoiled",
    imageUrl: "/samples/pepper_anthracnose.jpg",
    description: "Water-soaked sunken dark fruit lesions producing salmon-pink gelatinous spores.",
    recommendedAction: "Use pathogen-free seeds; spray copper octanoate or azoxystrobin before fruiting."
  },
  {
    id: "yam_leaf_spot",
    name: "Yam Cercospora Leaf Spot",
    crop: "Yam",
    condition: "Brown Angular Spotting & Foliage Dieback",
    badge: "Cercospora pachyderma",
    severity: "Moderate",
    isHealthy: false,
    category: "spoiled",
    imageUrl: "/samples/yam_leaf_spot.jpg",
    description: "Yellow-bordered brown angular leaf spots causing premature vine necrosis.",
    recommendedAction: "Stake vines high off ground; spray neem oil or copper hydroxide."
  },
  {
    id: "apple_rot",
    name: "Apple Frog-Eye Black Rot",
    crop: "Apple / Orchard",
    condition: "Concentric Frog-Eye Tan Spots",
    badge: "Botryosphaeria obtusa",
    severity: "Moderate",
    isHealthy: false,
    category: "spoiled",
    imageUrl: "/samples/apple_rot.jpg",
    description: "Concentric circular spots with tan centers and purple-bordered rings.",
    recommendedAction: "Prune dead twigs; apply Captan or thiophanate-methyl from pink bud stage."
  },

  // --- 10 HEALTHY CROPS ---
  {
    id: "healthy_cassava",
    name: "Healthy Cassava Foliage",
    crop: "Cassava",
    condition: "Optimal Chlorophyll & Lush Canopy",
    badge: "100% Healthy Crop",
    severity: "Healthy",
    isHealthy: true,
    category: "healthy",
    imageUrl: "/samples/healthy_cassava.jpg",
    description: "Deep emerald palmate leaflets with high chlorophyll density and zero lesions.",
    recommendedAction: "Maintain standard potassium earthing-up and weeding schedule."
  },
  {
    id: "healthy_maize",
    name: "Healthy Maize Cob & Foliage",
    crop: "Corn / Maize",
    condition: "Vibrant Green Blades & Full Kernel Fill",
    badge: "100% Healthy Crop",
    severity: "Healthy",
    isHealthy: true,
    category: "healthy",
    imageUrl: "/samples/healthy_maize.jpg",
    description: "Broad unblemished leaves with golden silk cob filling uniformly.",
    recommendedAction: "Apply NPK top-dressing at silking stage for maximum yield."
  },
  {
    id: "healthy_rice",
    name: "Healthy Rice Panicles",
    crop: "Rice",
    condition: "Optimal Photosynthesis & Clean Panicles",
    badge: "100% Healthy Crop",
    severity: "Healthy",
    isHealthy: true,
    category: "healthy",
    imageUrl: "/samples/healthy_rice.jpg",
    description: "Uniform deep green leaf blade with optimal panicle development.",
    recommendedAction: "Keep water depth at 5cm; maintain standard nitrogen feeding."
  },
  {
    id: "healthy_tomato",
    name: "Healthy Tomato Vines & Fruit",
    crop: "Tomato",
    condition: "Glossy Firm Fruit & Clean Leaves",
    badge: "100% Healthy Crop",
    severity: "Healthy",
    isHealthy: true,
    category: "healthy",
    imageUrl: "/samples/healthy_tomato.jpg",
    description: "Vibrant green leaves and firm, smooth red tomato fruits without spots.",
    recommendedAction: "Continue drip irrigation and calcium feeding to prevent blossom end rot."
  },
  {
    id: "healthy_cocoa",
    name: "Healthy Cocoa Pod & Foliage",
    crop: "Cocoa",
    condition: "Mature Golden Pod & Clean Bark",
    badge: "100% Healthy Crop",
    severity: "Healthy",
    isHealthy: true,
    category: "healthy",
    imageUrl: "/samples/healthy_cocoa.jpg",
    description: "Clean golden-orange cocoa pod attached to healthy tree stem.",
    recommendedAction: "Harvest promptly when fully golden to maximize bean quality."
  },
  {
    id: "healthy_potato",
    name: "Healthy Potato Canopy",
    crop: "Potato",
    condition: "Lush Unblemished Foliage",
    badge: "100% Healthy Crop",
    severity: "Healthy",
    isHealthy: true,
    category: "healthy",
    imageUrl: "/samples/healthy_potato.jpg",
    description: "Full green leaf surface with strong photosynthetic activity.",
    recommendedAction: "Hill up soil around stems to encourage tuber expansion."
  },
  {
    id: "healthy_banana",
    name: "Healthy Banana Leaf Blade",
    crop: "Banana",
    condition: "Broad Emerald Clean Leaf",
    badge: "100% Healthy Crop",
    severity: "Healthy",
    isHealthy: true,
    category: "healthy",
    imageUrl: "/samples/healthy_banana.jpg",
    description: "Massive glossy green leaf blade free from leaf specks or wilting.",
    recommendedAction: "Prune old lower leaves to promote bunch light interception."
  },
  {
    id: "healthy_pepper",
    name: "Healthy Bell Pepper Fruit",
    crop: "Pepper",
    condition: "Glossy Firm Green Pepper",
    badge: "100% Healthy Crop",
    severity: "Healthy",
    isHealthy: true,
    category: "healthy",
    imageUrl: "/samples/healthy_pepper.jpg",
    description: "Firm, thick-walled bell pepper with high skin luster and zero blemishes.",
    recommendedAction: "Maintain even soil moisture during fruit expansion."
  },
  {
    id: "healthy_yam",
    name: "Healthy Yam Vine & Canopy",
    crop: "Yam",
    condition: "Heart-Shaped Lush Climbing Foliage",
    badge: "100% Healthy Crop",
    severity: "Healthy",
    isHealthy: true,
    category: "healthy",
    imageUrl: "/samples/healthy_yam.jpg",
    description: "Vibrant climbing vine canopy with unblemished green leaves.",
    recommendedAction: "Maintain tall bamboo staking to maximize solar intake."
  },
  {
    id: "healthy_apple",
    name: "Healthy Apple Orchard Leaf",
    crop: "Apple / Orchard",
    condition: "Smooth Unblemished Orchard Foliage",
    badge: "100% Healthy Crop",
    severity: "Healthy",
    isHealthy: true,
    category: "healthy",
    imageUrl: "/samples/healthy_apple.jpg",
    description: "Clean orchard leaf without rust, black rot, or powdery mildew.",
    recommendedAction: "Standard spring orchard monitoring and maintenance."
  }
];
