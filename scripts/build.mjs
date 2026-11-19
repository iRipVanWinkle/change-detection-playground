import { execSync } from 'node:child_process';
import { cpSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');

const apps = [
  { project: 'change-detection/v19', output: 'dist/detector/browser' },
  { project: 'change-detection/v22', output: 'dist/detector/browser' },
  { project: 'dependency-injection', output: 'dist/dependency-injection-playground/browser' },
];

const landings = [
  { from: 'landing', to: '' },
  { from: 'change-detection/landing', to: 'change-detection' },
];

rmSync(dist, { recursive: true, force: true });

for (const { project, output } of apps) {
  execSync('npm run build', { cwd: join(root, project), stdio: 'inherit' });
  cpSync(join(root, project, output), join(dist, project), { recursive: true });
}

for (const { from, to } of landings) {
  cpSync(join(root, from), join(dist, to), { recursive: true });
}

console.log(`\nBuilt ${apps.map(({ project }) => project).join(' + ')} into ${dist}`);
