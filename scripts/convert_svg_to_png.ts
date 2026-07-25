import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const samplesDir = path.join(process.cwd(), 'public', 'samples');

async function convertAll() {
  const files = fs.readdirSync(samplesDir).filter((f) => f.endsWith('.svg'));
  console.log(`Found ${files.length} SVG files to convert to PNG...`);

  for (const file of files) {
    const svgPath = path.join(samplesDir, file);
    const pngName = file.replace('.svg', '.png');
    const pngPath = path.join(samplesDir, pngName);

    try {
      const svgBuffer = fs.readFileSync(svgPath);
      const image = await loadImage(svgBuffer);

      const canvas = createCanvas(1200, 900);
      const ctx = canvas.getContext('2d');

      // Draw background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 1200, 900);

      // Draw vector image scaled
      ctx.drawImage(image, 0, 0, 1200, 900);

      const pngBuffer = canvas.toBuffer('image/png');
      fs.writeFileSync(pngPath, pngBuffer);
      console.log(`Successfully generated PNG: ${pngName}`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }

  console.log('PNG conversion complete!');
}

convertAll();
