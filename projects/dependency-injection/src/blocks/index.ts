export { BlockBase } from './block-base';
export type { BlocksTree } from './block-base';
export { BlockComponent } from './block.component';
export { BlockProvidersComponent } from './block-providers.component';
export { BlockViewProvidersComponent } from './block-view-providers.component';
export { EnvInjectorsComponent } from './env-injectors.component';
export { ProvideDemoServiceDirective } from './provide-demo-service.directive';
export * from './legend';

import { BlockComponent } from './block.component';
import { BlockProvidersComponent } from './block-providers.component';
import { BlockViewProvidersComponent } from './block-view-providers.component';
import { EnvInjectorsComponent } from './env-injectors.component';
import { ProvideDemoServiceDirective } from './provide-demo-service.directive';

/** Everything the shared template `block.html` needs. */
export const BLOCK_IMPORTS = [
  BlockComponent,
  BlockProvidersComponent,
  BlockViewProvidersComponent,
  ProvideDemoServiceDirective,
  EnvInjectorsComponent,
] as const;
