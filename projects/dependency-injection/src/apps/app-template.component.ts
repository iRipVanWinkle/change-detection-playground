import { Component } from '@angular/core';
import {
  BLOCK_IMPORTS,
  BlockComponent,
  legend,
  LEGEND_OUTLET,
  LEGEND_TEMPLATE,
  LEGEND_VIEW,
} from '../blocks';

/**
 * `<ng-template>` and `ngTemplateOutletInjector`.
 *
 * The template with a block is declared here, in the template of [a],
 * and rendered by [b] and [c] with `NgTemplateOutlet`.
 * A block from a template looks up its dependencies from the place where the template is declared:
 * [d] goes straight to [a] and gets the root instance, although it is rendered inside [b].
 * [c] passes `ngTemplateOutletInjector: 'outlet'`, so [e] starts from the place where it is rendered
 * and gets the instance of [c].
 *
 * The template is written by hand to make the `<ng-template>` explicit.
 */
@Component({
  selector: 'app-template',
  template: `
    <h2 class="header">{{ title }}</h2>

    <app-env-injectors />

    <div #container class="block-container">
      <div class="block-wrap">
        <div
          #block
          class="block block__none"
          [style.width.px]="rootWidth / depth()"
          (click)="lookup()"
        >
          <i class="id">{{ id() }}</i>
          <p>{{ label }}</p>

          @if (result(); as result) {
            <strong class="result" [style.color]="result.color" [title]="result.title">{{
              result.text
            }}</strong>
          }
        </div>
      </div>

      <div class="block-inner">
        <app-block-providers [depth]="2" [template]="row" />

        <app-block-providers [depth]="2" [template]="row" templateInjector="outlet" />
      </div>
    </div>

    <ng-template #row>
      <app-block [depth]="3" [declaredIn]="this" />
    </ng-template>

    <div class="description" [innerHTML]="description"></div>
  `,
  imports: [BLOCK_IMPORTS],
})
export class AppTemplateComponent extends BlockComponent {
  override title = '<ng-template>';
  override description = legend(LEGEND_VIEW, LEGEND_TEMPLATE, LEGEND_OUTLET);
}
