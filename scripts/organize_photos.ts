import fs from 'fs';
import path from 'path';

const samplesDir = path.join(process.cwd(), 'public', 'samples');
const files = fs.readdirSync(samplesDir);

const mapping: Record<string, string> = {
  cassava_mosaic_photo: 'cassava_mosaic.jpg',
  tomato_blight_photo: 'tomato_blight.jpg',
  cocoa_blackpod_photo: 'cocoa_black_pod.jpg',
  maize_rust_photo: 'corn_rust.jpg',
  rice_blight_photo: 'rice_blight.jpg',
  potato_blight_photo: 'potato_early_blight.jpg',
  banana_sigatoka_photo: 'banana_sigatoka.jpg',
  pepper_anthracnose_photo: 'pepper_anthracnose.jpg',
  yam_leafspot_photo: 'yam_leaf_spot.jpg',
  apple_rot_photo: 'apple_rot.jpg',
  healthy_cassava_photo: 'healthy_cassava.jpg',
  healthy_tomato_photo: 'healthy_tomato.jpg',
  healthy_maize_photo: 'healthy_maize.jpg',
  healthy_cocoa_photo: 'healthy_cocoa.jpg',
  healthy_potato_photo: 'healthy_potato.jpg',
  healthy_banana_photo: 'healthy_banana.jpg',
  healthy_pepper_photo: 'healthy_pepper.jpg',
  healthy_yam_photo: 'healthy_yam.jpg',
  healthy_apple_photo: 'healthy_apple.jpg',
  healthy_rice_photo: 'healthy_rice.jpg',
};

files.forEach((file) => {
  if (file.endsWith('.jpg')) {
    const base = file.replace(/_\d+\.jpg$/, '');
    if (mapping[base]) {
      const target = path.join(samplesDir, mapping[base]);
      const src = path.join(samplesDir, file);
      fs.copyFileSync(src, target);
      console.log(`Mapped ${file} -> ${mapping[base]}`);
    }
  }
});
