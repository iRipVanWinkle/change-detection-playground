import { NgTemplateOutlet } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { DemoService } from '../helpers/demo.service';
import { BlockBase } from './block-base';
import { BlockComponent } from './block.component';
import { BlockProvidersComponent } from './block-providers.component';
import { EnvInjectorsComponent } from './env-injectors.component';
import { ProvideDemoServiceDirective } from './provide-demo-service.directive';

/**
 * A component with its own `DemoService` declared in `viewProviders`.
 * The instance is visible to the component itself and to its view children,
 * but NOT to the content projected into it.
 */
@Component({
  selector: 'app-block-view-providers',
  templateUrl: './block.html',
  imports: [
    forwardRef(() => BlockComponent),
    forwardRef(() => BlockProvidersComponent),
    forwardRef(() => BlockViewProvidersComponent),
    EnvInjectorsComponent,
    ProvideDemoServiceDirective,
    NgTemplateOutlet,
  ],
  viewProviders: [DemoService],
})
export class BlockViewProvidersComponent extends BlockBase {
  readonly kind = 'viewProviders';
}
