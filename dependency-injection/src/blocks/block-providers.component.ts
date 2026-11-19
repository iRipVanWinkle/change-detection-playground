import { Component, forwardRef } from '@angular/core';
import { DemoService } from '../helpers/demo.service';
import { BlockBase } from './block-base';
import { BlockComponent } from './block.component';
import { BlockViewProvidersComponent } from './block-view-providers.component';
import { EnvInjectorsComponent } from './env-injectors.component';
import { ProvideDemoServiceDirective } from './provide-demo-service.directive';

/**
 * A component with its own `DemoService`.
 * The instance is visible to the component itself and to everything below it:
 * both view children and content children.
 */
@Component({
  selector: 'app-block-providers',
  templateUrl: './block.html',
  imports: [
    forwardRef(() => BlockComponent),
    forwardRef(() => BlockProvidersComponent),
    forwardRef(() => BlockViewProvidersComponent),
    EnvInjectorsComponent,
    ProvideDemoServiceDirective,
  ],
  providers: [DemoService],
})
export class BlockProvidersComponent extends BlockBase {
  readonly kind = 'providers';
}
