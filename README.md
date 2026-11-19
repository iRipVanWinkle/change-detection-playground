# Angular Playground

Demo applications for my articles about Angular internals. Each playground is a tree of components you can click on and watch what Angular does.

**Demo:** https://iripvanwinkle.github.io/angular-playground/

| Playground | Folder | Angular | Dev server | Article |
|---|---|---|---|---|
| Change Detection | [`projects/change-detection/v19`](projects/change-detection/v19) | 19.1 | http://localhost:4219 | [en](https://medium.com/@iripvanwinkle/angular-change-detection-d3654c29099f), [ua](https://dou.ua/forums/topic/53274/) |
| | [`projects/change-detection/v22`](projects/change-detection/v22) | 22.2 | http://localhost:4222 | |
| Dependency Injection | [`projects/dependency-injection`](projects/dependency-injection) | 22.2 | http://localhost:4200 | |

Every project in [`projects/`](projects) is a standalone Angular app with its own `package.json` and `node_modules`. They share no code, so one can be upgraded without touching the others. See the README in each folder for details.

## Getting Started

Node.js 22.22.3 or newer (see `.nvmrc`). It works for all projects.

```bash
git clone https://github.com/iRipVanWinkle/angular-playground.git
cd angular-playground
npm run install:all
```

### Dev servers

```bash
npm start              # all apps at once
npm run start:cd       # Change Detection, v19 + v22
npm run start:cd:19
npm run start:cd:22
npm run start:di
```

### Build and preview

```bash
npm run build     # builds every app and puts them under one dist/ folder
npm run preview   # serves dist/ at http://localhost:4300
npm test          # runs the Vitest specs of projects/change-detection/v22
```

The build has one entry page with links to every playground:

```
dist/
├── index.html                 # landing/
├── change-detection/
│   ├── index.html             # projects/change-detection/landing/ — choose a version
│   ├── v19/
│   └── v22/
└── dependency-injection/
```

The apps use a relative `<base href>`, so `dist/` works on any static host, including a sub-path such as GitHub Pages. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys it on every push to `main`.

### Adding a playground

1. Create a standalone Angular app in its own folder under `projects/`, with `"baseHref": "./"` in the production build configuration and a free dev server port.
2. Add it to `apps` in [`scripts/build.mjs`](scripts/build.mjs), to `install:all` and `start` in `package.json`, and to `.github/workflows/deploy.yml`.
3. Add a card to [`landing/index.html`](landing/index.html).

## Old URLs

The Change Detection playground used to live at `iripvanwinkle.github.io/change-detection-playground/`, and the published articles still link there. [`redirects/change-detection-playground/`](redirects/change-detection-playground) holds the pages that go to the `gh-pages` branch of the old repository and send visitors here. A scenario link such as `?onpush` goes to `change-detection/v19/`, because the old site root served the Angular 19 app.

## License

This project is licensed under the MIT License.
