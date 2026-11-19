import { Directive } from '@angular/core';
import { DemoService } from '../helpers/demo.service';

/**
 * A directive with its own `DemoService`.
 * There is one `ElementInjector` per element, so the provider of the directive
 * lands in the same injector the component on this element uses.
 */
@Directive({
  selector: '[appProvideDemoService]',
  providers: [DemoService],
})
export class ProvideDemoServiceDirective {}
