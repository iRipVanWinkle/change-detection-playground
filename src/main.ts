import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppDefaultComponent } from './apps/app-default.component';
import { AppOnPushComponent } from './apps/app-onpush.component';
import { AppDefaultWithOnPushComponent } from './apps/app-default-with-onpush.component';
import { AppOnPushWithDefaultComponent } from './apps/app-onpush-with-default.component';
import { AppOnPushContentComponent } from './apps/app-onpush-content.component';
import { AppDefaultZonelessComponent } from './apps/app-default-zoneless.component';
import { IdentifierGenerator } from './helpers/identifier-generator.service';
import { AppDefaultSignalComponent } from './apps/app-default-signal.component';
import { AppOnPushSignalComponent } from './apps/app-onpush-signal.component';
import { AppDefaultManualComponent } from './apps/app-default-manual.component';
import { AppOnPushDoCheckComponent } from './apps/app-onpush-do-check.component';

const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    IdentifierGenerator
  ]
};

const appZonelessConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    IdentifierGenerator
  ]
};

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
}

Object.entries(applications)
  .filter(([key]) => displayAll || searchParams.has(key))
  .forEach(([, rootComponent]) => {
    bootstrapApplication(rootComponent, appConfig)
      .catch((err) => console.error(err));
  });

const zonelessApplications = {
  defaultZoneless: AppDefaultZonelessComponent
}

Object.entries(zonelessApplications)
  .filter(([key]) => displayAll || searchParams.has(key))
  .forEach(([, rootComponent]) => {
    bootstrapApplication(rootComponent, appZonelessConfig)
      .catch((err) => console.error(err));
  });
