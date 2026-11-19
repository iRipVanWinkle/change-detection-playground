# Angular Playground

Demo applications for my articles about Angular internals. Each playground is a tree of components you can click on and watch what Angular does.

**Demo:** https://iripvanwinkle.github.io/angular-internals-playground/

| Playground           | Folder                                                           | Angular | Dev server            | Article                                                                                                                 |
| -------------------- | ---------------------------------------------------------------- | ------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Change Detection     | [`projects/change-detection/v19`](projects/change-detection/v19) | 19.1    | http://localhost:4219 | [en](https://medium.com/@iripvanwinkle/angular-change-detection-d3654c29099f), [ua](https://dou.ua/forums/topic/53274/) |
|                      | [`projects/change-detection/v22`](projects/change-detection/v22) | 22.2    | http://localhost:4222 |                                                                                                                         |
| Dependency Injection | [`projects/dependency-injection`](projects/dependency-injection) | 22.2    | http://localhost:4200 |                                                                                                                         |

Every project in [`projects/`](projects) is a standalone Angular app with its own `package.json` and `node_modules`. They share no code, so one can be upgraded without touching the others. See the README in each folder for details.

## Getting Started

Node.js 22.22.3 or newer (see `.nvmrc`). It works for all projects.

```bash
git clone https://github.com/iRipVanWinkle/angular-internals-playground.git
cd angular-internals-playground
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
npm run format    # Prettier for the whole repository
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

## Conventions

The projects share no code, but they are written the same way, so a new playground can start as a copy of an existing one:

- one `.editorconfig`, `.prettierrc` and LF line endings for the whole repository;
- the same `tsconfig*.json` in every Angular 22 project, with `strictTemplates`;
- signal-based `input()` and `viewChild()`;
- a scenario is a root component in `src/apps/`, built from blocks in `src/blocks/` described by a `BlocksTree`; a root component declares its tree in `rootTree`, because it is bootstrapped without inputs;
- one scenario = one application, picked by a query parameter (`?providers`), all of them when there is none.

`projects/change-detection/v19` is the snapshot for the first article and is left as it was: it is excluded from Prettier and keeps its line endings.

## License

This project is licensed under the MIT License.
