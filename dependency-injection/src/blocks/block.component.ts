import { Component, forwardRef, inject } from '@angular/core';
import { BlockBase, BlockKind } from './block-base';
import { BlockProvidersComponent } from './block-providers.component';
import { BlockViewProvidersComponent } from './block-view-providers.component';
import { EnvInjectorsComponent } from './env-injectors.component';
import { ProvideDemoServiceDirective } from './provide-demo-service.directive';

/** A component that does not provide `DemoService`, it only asks for it. */
@Component({
  selector: 'app-block',
  templateUrl: './block.html',
  imports: [
    forwardRef(() => BlockComponent),
    forwardRef(() => BlockProvidersComponent),
    forwardRef(() => BlockViewProvidersComponent),
    EnvInjectorsComponent,
    ProvideDemoServiceDirective,
  ],
})
export class BlockComponent extends BlockBase {
  // The directive, if any, sits on the very element of this component
  readonly kind: BlockKind = inject(ProvideDemoServiceDirective, { self: true, optional: true })
    ? 'directive'
    : 'none';
}
