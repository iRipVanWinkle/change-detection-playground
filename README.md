# Angular Change Detection Playground

This project is an Angular application designed to explore and demonstrate various change detection strategies and techniques in Angular. It provides examples of different component configurations and their behavior under different change detection scenarios.

This is a demo application for the article **Angular Change Detection** ([en](https://medium.com/@iripvanwinkle/angular-change-detection-d3654c29099f), [ua](https://dou.ua/forums/topic/53274/))

## Project Structure

The project is organized as follows:

- **`src/`**: Contains the main application code.
  - **`apps/`**: Includes various Angular components demonstrating different change detection strategies.
  - **`blocks/`**: Contains reusable building blocks for the application.
  - **`helpers/`**: Utility functions and helpers for the application.

## Components

The application includes the following components, each demonstrating a specific change detection strategy:

- `<app-default>`: Default change detection strategy.
- `<app-default-with-onpush>`: Default strategy combined with `OnPush`.
- `<app-default-signal>`: Default strategy using Angular Signals.
- `<app-onpush>`: `OnPush` change detection strategy.
- `<app-onpush-with-default>`: `OnPush` combined with default behavior.
- `<app-onpush-signal>`: `OnPush` strategy using Angular Signals.
- `<app-default-zoneless>`: Default strategy without Angular Zones.
- `<app-onpush-content>`: `OnPush` strategy with `ng-content`.
- `<app-default-manual>`: Manual change detection.
- `<app-onpush-do-check>`: `OnPush` strategy with `ngDoCheck`.

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- Angular CLI

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd change-detection-playground
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To serve the application locally, run:

```bash
npm start
```

The application will be available at `http://localhost:4200`.

### Building the Application

To build the application for production, run:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Exploring Change Detection

Navigate through the application using the menu to explore different change detection strategies. Each menu item corresponds to a specific component and strategy.

## License

This project is licensed under the MIT License.
