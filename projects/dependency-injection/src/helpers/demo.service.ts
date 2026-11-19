import { inject, Injectable, Provider } from '@angular/core';
import { Playground, ROOT_PROVIDES } from './playground.service';

/**
 * The service every block asks for.
 *
 * It has no `providedIn` on purpose: every scenario decides on its own
 * where the service is provided — in the root injector, in a component, or nowhere.
 */
@Injectable()
export class DemoService {
  /** Sequential number of the instance: the same number on the screen means the same instance. */
  readonly id = inject(Playground).registerInstance(this);
}

/**
 * Registers `DemoService` in the root `EnvironmentInjector` of an application.
 * The effect is the same as `@Injectable({ providedIn: 'root' })`.
 */
export function provideDemoServiceInRoot(): Provider[] {
  return [DemoService, { provide: ROOT_PROVIDES, useValue: true }];
}
