import { execSync } from 'node:child_process';
import { cpSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const versions = ['v19', 'v22'];

rmSync(dist, { recursive: true, force: true });

for (const version of versions) {
  execSync('npm run build', { cwd: join(root, version), stdio: 'inherit' });
  cpSync(join(root, version, 'dist/detector/browser'), join(dist, version), { recursive: true });
}

cpSync(join(root, 'landing'), dist, { recursive: true });

console.log(`\nBuilt ${versions.join(' + ')} into ${dist}`);
