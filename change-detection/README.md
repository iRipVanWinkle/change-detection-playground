# Angular Change Detection Playground

This project is an Angular application designed to explore and demonstrate various change detection strategies and techniques in Angular. It provides examples of different component configurations and their behavior under different change detection scenarios.

This is a demo application for the article **Angular Change Detection** ([en](https://medium.com/@iripvanwinkle/angular-change-detection-d3654c29099f), [ua](https://dou.ua/forums/topic/53274/))

The playground ships in two versions that run side by side, so you can compare how change detection works in Angular 19 and Angular 22:

| Folder | Angular | URL |
|---|---|---|
| [`v19/`](v19) | 19.1 — the version the article was written for | http://localhost:4219 |
| [`v22/`](v22) | 22.2 — upgraded and modernized | http://localhost:4222 |

Every page has a link in the menu that opens the same example in the other version.

## Project Structure

Both `v19/` and `v22/` are standalone Angular projects with the same layout:

- **`src/apps/`**: Root components, one per change detection scenario.
- **`src/blocks/`**: Reusable building blocks (the tree nodes) for the scenarios.
- **`src/helpers/`**: Utility functions and helpers for the application.

## Components

Each component demonstrates a specific change detection strategy:

- `<app-default>`: Default (`Eager` in v22) change detection strategy.
- `<app-default-with-onpush>`: Default strategy combined with `OnPush`.
- `<app-default-signal>`: Default strategy using Angular Signals.
- `<app-onpush>`: `OnPush` change detection strategy.
- `<app-onpush-with-default>`: `OnPush` combined with default behavior.
- `<app-onpush-signal>`: `OnPush` strategy using Angular Signals.
- `<app-default-zoneless>`: Default strategy without Angular Zones.
- `<app-onpush-content>`: `OnPush` strategy with `ng-content`.
- `<app-default-manual>`: Manual change detection.
- `<app-onpush-do-check>`: `OnPush` strategy with `ngDoCheck`.
- `<app-implicit>` (v22 only): a component without `changeDetection`, which is `OnPush` since Angular 22.

## What changed in Angular 22

The examples behave the same in both versions. The differences are in the API and the defaults:

| | Angular 19 | Angular 22 |
|---|---|---|
| Strategy when `changeDetection` is omitted | `Default` | `OnPush` |
| Name of the "check every time" strategy | `ChangeDetectionStrategy.Default` | `ChangeDetectionStrategy.Eager` (`Default` is deprecated) |
| App without change detection providers | Zone.js | Zoneless (since v21); Zone.js needs `provideZoneChangeDetection()` |
| Zoneless provider | `provideExperimentalZonelessChangeDetection()` | `provideZonelessChangeDetection()` |
| Hook after each render | `afterRender()` | `afterEveryRender()` with `earlyRead` / `write` phases |
| Inputs and view queries | `@Input()`, `@ViewChild()` | `input()`, `viewChild()` |
| Inputs of a dynamic component | `ComponentRef.setInput()` | `createComponent(..., { bindings: [inputBinding(...)] })` |
| Services | `@Injectable()` + `providers` | `@Service()` |
| Build / tests | `@angular-devkit/build-angular`, Karma | `@angular/build`, Vitest |
| Node.js / TypeScript | Node 18.19+ / TS 5.5–5.7 | Node 22.22.3+ / TS 6.0 |

The **No strategy (v22 default)** example shows why the new default matters: clicking an `Eager` block under a component with no strategy does not update its counter, because its `OnPush`-by-default ancestors are never marked dirty.

## Getting Started

This playground is part of [Angular Playground](../README.md). Install and run everything from the repository root:

```bash
npm run install:all
npm run start:cd     # both versions
npm run start:cd:19  # http://localhost:4219
npm run start:cd:22  # http://localhost:4222
npm test             # runs the Vitest specs of v22
```

In the build (`npm run build`), [`landing/`](landing) becomes `dist/change-detection/index.html`, where you choose a version, and the apps go to `dist/change-detection/v19/` and `dist/change-detection/v22/`. In the build, the menu link switches between `v19/` and `v22/` on the same origin; with the dev servers it switches between the ports.

## Exploring Change Detection

Navigate through the application using the menu to explore different change detection strategies. Each menu item corresponds to a specific component and strategy.

## License

This project is licensed under the MIT License.
