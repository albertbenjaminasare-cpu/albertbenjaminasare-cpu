import fs from 'fs';
import path from 'path';
import { CROP_20_SAMPLES } from '../src/data/cropSamples.ts';

const samplesDir = path.join(process.cwd(), 'public', 'samples');
if (!fs.existsSync(samplesDir)) {
  fs.mkdirSync(samplesDir, { recursive: true });
}

CROP_20_SAMPLES.forEach((sample) => {
  const svgData = sample.imageUrl.replace('data:image/svg+xml;utf8,', '');
  const fileName = `${sample.id}.svg`;
  const filePath = path.join(samplesDir, fileName);
  fs.writeFileSync(filePath, svgData, 'utf8');
  console.log(`Saved: ${fileName}`);
});

console.log('All 20 sample images successfully saved to /public/samples/');
