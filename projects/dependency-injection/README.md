# Angular Dependency Injection Playground

This project is an Angular application designed to explore and demonstrate how Dependency Injection resolves a dependency: where Angular looks for a provider, in what order, and which instance a component finally gets.

It follows the idea of the [Change Detection Playground](../change-detection): a tree of components you can click on and watch what Angular does.

## How to read the picture

Every pill is an injector.

- The pills with a solid border are components, labelled `a`, `b`, `c`… Each of them has its own `ElementInjector`.
  - **blue** — the component declares `providers: [DemoService]`;
  - **violet** — the component declares `viewProviders: [DemoService]`;
  - **teal** — a directive on the component's element declares `providers: [DemoService]`;
  - **orange** — the component provides nothing.
- The dashed pills above the tree are the `EnvironmentInjector` hierarchy: `root` → `platform` → `NullInjector`.
- The small text under a label shows the options the component passes to `inject()`: `self`, `skipSelf`, `optional`, `host`.

**Click a component** and it asks Angular for `DemoService`, exactly as `inject(DemoService, options)` in its constructor would do:

- the injectors Angular goes through flash **yellow**, one after another;
- the injector that has the provider flashes **green**;
- the number in the top right corner (`#1`) is the instance the component received — the same number and color mean the same instance;
- the filled badge on the bottom border (`#1`) marks the injector that created the instance and keeps it. Instances are created lazily, on the first request;
- `✗` means `NullInjectorError` (hover it to read the message), `null` is the result of an `optional` lookup that found nothing.

The lookup itself is always performed by Angular (`Injector.get()` on the component's own injector); the playground only shows what has happened.

## Scenarios

Every scenario is a separate Angular application with its own root injector. Use the menu to open one of them (`/?providers`) or all at once.

| Menu item | Component | What it shows |
| --- | --- | --- |
| Root provider | `<app-root-provider>` | `providedIn: 'root'` — every lookup ends in the root injector, one instance for everybody. |
| Component providers | `<app-providers>` | `providers` of a component — a separate instance for the component and everything below it; it hides the root one. |
| Directive providers | `<app-directive>` | A directive shares the `ElementInjector` of its element: its provider is found with `self` and skipped with `skipSelf`. |
| providers vs viewProviders | `<app-view-providers>` | View children vs content children (`<ng-content>`): projected content does not see `viewProviders`. |
| self & skipSelf | `<app-self-skip-self>` | `self` checks only the component's own injector, `skipSelf` starts from the parent. |
| optional | `<app-optional>` | No root provider: `NullInjectorError` vs `null` for an `optional` dependency. |
| host | `<app-host>` | `host` stops at the host component, where only `viewProviders` are visible. |
| host & ng-content | `<app-host-content>` | The host is the component whose template declares the block, not its parent element. |

## Project Structure

- **`src/`**: Contains the main application code.
  - **`apps/`**: One root component per scenario. A scenario is described by a `blocksTree` — which blocks provide `DemoService` and with which options they inject it.
  - **`blocks/`**: The building blocks: `BlockComponent` (no providers), `BlockProvidersComponent` (`providers`), `BlockViewProvidersComponent` (`viewProviders`), `ProvideDemoServiceDirective` (a directive with `providers`), and their common base `BlockBase` with the shared template `block.html`.
  - **`helpers/`**: `DemoService` — the service every block asks for, and `Playground` — the visualization (ids, lines, animation of a lookup).

To add a scenario: create a component in `src/apps/`, register it in `src/main.ts`, and add its tag and a menu link to `src/index.html`.

## Getting Started

This playground is part of [Angular Playground](../../README.md). Install and run everything from the repository root:

```bash
npm run install:all
npm run start:di     # http://localhost:4200
```

Or work in this folder on its own: `npm install`, `npm start`, `npm run build`.

## License

This project is licensed under the MIT License.
