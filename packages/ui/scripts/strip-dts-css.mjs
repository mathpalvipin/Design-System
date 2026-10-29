// tsc keeps side-effect imports like `import './Button.css'` in emitted .d.ts files.
// They carry no types and can't be resolved by consumers, so strip them after the build.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = fileURLToPath(new URL('../dist', import.meta.url));
const cssImport = /^import\s+['"][^'"]+\.css['"];?\r?\n/gm;

for (const file of await readdir(distDir, { recursive: true })) {
  if (!file.endsWith('.d.ts')) continue;
  const path = join(distDir, file);
  const source = await readFile(path, 'utf8');
  const stripped = source.replace(cssImport, '');
  if (stripped !== source) await writeFile(path, stripped);
}
