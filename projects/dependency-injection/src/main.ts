import { Provider, provideBrowserGlobalErrorListeners, Type } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppDirectiveComponent } from './apps/app-directive.component';
import { AppHostContentComponent } from './apps/app-host-content.component';
import { AppHostComponent } from './apps/app-host.component';
import { AppOptionalComponent } from './apps/app-optional.component';
import { AppProvidersComponent } from './apps/app-providers.component';
import { AppRootProviderComponent } from './apps/app-root-provider.component';
import { AppSelfSkipSelfComponent } from './apps/app-self-skip-self.component';
import { AppTemplateComponent } from './apps/app-template.component';
import { AppViewProvidersComponent } from './apps/app-view-providers.component';
import { provideDemoServiceInRoot } from './helpers/demo.service';
import { Playground } from './helpers/playground.service';

interface Application {
  component: Type<unknown>;
  /** Providers of the root `EnvironmentInjector` of the application. */
  providers?: Provider[];
}

const searchParams = new URLSearchParams(location.search);

const displayAll = searchParams.size === 0;

// Every scenario is a separate Angular application with its own root injector
const applications: Record<string, Application> = {
  root: { component: AppRootProviderComponent, providers: [provideDemoServiceInRoot()] },
  providers: { component: AppProvidersComponent, providers: [provideDemoServiceInRoot()] },
  directive: { component: AppDirectiveComponent, providers: [provideDemoServiceInRoot()] },
  viewProviders: { component: AppViewProvidersComponent },
  skipSelf: { component: AppSelfSkipSelfComponent, providers: [provideDemoServiceInRoot()] },
  optional: { component: AppOptionalComponent },
  host: { component: AppHostComponent, providers: [provideDemoServiceInRoot()] },
  hostContent: { component: AppHostContentComponent },
  template: { component: AppTemplateComponent, providers: [provideDemoServiceInRoot()] },
};

Object.entries(applications)
  .filter(([key]) => displayAll || searchParams.has(key))
  .forEach(([, { component, providers = [] }]) => {
    bootstrapApplication(component, {
      providers: [provideBrowserGlobalErrorListeners(), Playground, ...providers],
    }).catch((err) => console.error(err));
  });
