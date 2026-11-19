import { execSync } from 'node:child_process';
import { cpSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');

const apps = [
  { project: 'projects/change-detection/v19', output: 'dist/detector/browser', url: 'change-detection/v19' },
  { project: 'projects/change-detection/v22', output: 'dist/detector/browser', url: 'change-detection/v22' },
  {
    project: 'projects/dependency-injection',
    output: 'dist/dependency-injection-playground/browser',
    url: 'dependency-injection',
  },
];

const landings = [
  { from: 'landing', url: '' },
  { from: 'projects/change-detection/landing', url: 'change-detection' },
];

rmSync(dist, { recursive: true, force: true });

for (const { project, output, url } of apps) {
  execSync('npm run build', { cwd: join(root, project), stdio: 'inherit' });
  cpSync(join(root, project, output), join(dist, url), { recursive: true });
}

for (const { from, url } of landings) {
  cpSync(join(root, from), join(dist, url), { recursive: true });
}

console.log(`\nBuilt ${apps.map(({ project }) => project).join(' + ')} into ${dist}`);
