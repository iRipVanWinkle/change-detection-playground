import { Component, ElementRef, inject, signal, Signal, viewChild } from '@angular/core';
import type { DemoService } from '../helpers/demo.service';
import { EnvInjectorViews, InjectorView, Playground } from '../helpers/playground.service';
import { instanceColor } from './constants';

/**
 * The `EnvironmentInjector` hierarchy above the component tree:
 * NullInjector ← platform ← root. Purely visual — the lookup is done by Angular.
 */
@Component({
  selector: 'app-env-injectors',
  template: `
    <div #nullInjectorEl class="env">NullInjector</div>

    <div #platformEl class="env">platform</div>

    <div #rootEl class="env" [class.env__provider]="rootProvides">
      {{ rootProvides ? "root · providedIn: 'root'" : 'root' }}

      @if (root.instance(); as service) {
        <span class="instance" [style.background-color]="instanceColor(service)"
          >#{{ service.id }}</span
        >
      }
    </div>
  `,
})
export class EnvInjectorsComponent implements EnvInjectorViews {
  private readonly rootEl = viewChild.required<ElementRef<HTMLElement>>('rootEl');
  private readonly platformEl = viewChild.required<ElementRef<HTMLElement>>('platformEl');
  private readonly nullInjectorEl = viewChild.required<ElementRef<HTMLElement>>('nullInjectorEl');

  readonly root = injectorView(this.rootEl);
  readonly platform = injectorView(this.platformEl);
  readonly nullInjector = injectorView(this.nullInjectorEl);

  protected readonly rootProvides: boolean;
  protected readonly instanceColor = instanceColor;

  constructor() {
    const playground = inject(Playground);

    playground.env = this;
    this.rootProvides = playground.rootProvides;
  }
}

function injectorView(elementRef: Signal<ElementRef<HTMLElement>>): InjectorView {
  return {
    instance: signal<DemoService | null>(null),
    get element() {
      return elementRef().nativeElement;
    },
  };
}
