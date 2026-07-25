import fs from 'fs';
import path from 'path';

const samplesDir = path.join(process.cwd(), 'public', 'samples');

const files = fs.readdirSync(samplesDir).filter((f) => f.endsWith('.svg'));

for (const file of files) {
  const filePath = path.join(samplesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = decodeURIComponent(content);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleaned SVG: ${file}`);
}
