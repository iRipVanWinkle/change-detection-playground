import { ApplicationConfig, provideZoneChangeDetection, provideZonelessChangeDetection, VERSION, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppDefaultComponent } from './apps/app-default.component';
import { AppOnPushComponent } from './apps/app-onpush.component';
import { AppDefaultWithOnPushComponent } from './apps/app-default-with-onpush.component';
import { AppOnPushWithDefaultComponent } from './apps/app-onpush-with-default.component';
import { AppOnPushContentComponent } from './apps/app-onpush-content.component';
import { AppDefaultZonelessComponent } from './apps/app-default-zoneless.component';
import { AppDefaultSignalComponent } from './apps/app-default-signal.component';
import { AppOnPushSignalComponent } from './apps/app-onpush-signal.component';
import { AppDefaultManualComponent } from './apps/app-default-manual.component';
import { AppOnPushDoCheckComponent } from './apps/app-onpush-do-check.component';
import { AppImplicitComponent } from './apps/app-implicit.component';

// Since Angular 21 apps are zoneless unless they opt in to Zone.js explicitly.
const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};

// Zoneless is already the default; it is spelled out because this page also runs zone-based apps.
const appZonelessConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection()
  ]
};

document.querySelector('.angular-version')!.textContent = `Angular ${VERSION.full}`;

// Dev servers run each version on its own port; the production build puts both versions side by side.
const versionSwitch = document.querySelector<HTMLAnchorElement>('.version-switch')!;
versionSwitch.href = isDevMode()
  ? `${location.protocol}//${location.hostname}:${versionSwitch.dataset['devPort']}/${location.search}`
  : `${versionSwitch.dataset['buildPath']}${location.search}`;

const searchParams = new URLSearchParams(location.search);

const displayAll = searchParams.size === 0;

const applications = {
  default: AppDefaultComponent,
  onpush: AppOnPushComponent,
  defaultWithOnPush: AppDefaultWithOnPushComponent,
  onPushWithDefault: AppOnPushWithDefaultComponent,
  defaultSignal: AppDefaultSignalComponent,
  onPushSignal: AppOnPushSignalComponent,
  onPushContent: AppOnPushContentComponent,
  defaultManual: AppDefaultManualComponent,
  onPushDoCheck: AppOnPushDoCheckComponent,
  implicit: AppImplicitComponent,
};

Object.entries(applications)
  .filter(([key]) => displayAll || searchParams.has(key))
  .forEach(([, rootComponent]) => {
    bootstrapApplication(rootComponent, appConfig)
      .catch((err) => console.error(err));
  });

const zonelessApplications = {
  defaultZoneless: AppDefaultZonelessComponent
};

Object.entries(zonelessApplications)
  .filter(([key]) => displayAll || searchParams.has(key))
  .forEach(([, rootComponent]) => {
    bootstrapApplication(rootComponent, appZonelessConfig)
      .catch((err) => console.error(err));
  });
