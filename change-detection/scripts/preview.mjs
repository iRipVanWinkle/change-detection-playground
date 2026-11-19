import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist', import.meta.url));
const port = Number(process.env.PORT ?? 4300);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
};

createServer((req, res) => {
  const { pathname, search } = new URL(req.url, 'http://localhost');
  let file = normalize(join(dist, decodeURIComponent(pathname)));

  if (file !== dist && !file.startsWith(dist + sep)) {
    res.writeHead(403).end();
    return;
  }

  try {
    if (statSync(file).isDirectory()) {
      // The apps use a relative <base href>, so /v19 must become /v19/ for their assets to resolve.
      if (!pathname.endsWith('/')) {
        res.writeHead(301, { Location: `${pathname}/${search}` }).end();
        return;
      }
      file = join(file, 'index.html');
    }
    statSync(file);
  } catch {
    res.writeHead(404).end('Not found');
    return;
  }

  res.writeHead(200, { 'Content-Type': contentTypes[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`Serving ${dist} at http://localhost:${port}/`);
});
