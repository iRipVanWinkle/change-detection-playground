import { Component } from '@angular/core';
import {
  BLOCK_IMPORTS,
  BlockComponent,
  legend,
  LEGEND_CONTENT,
  LEGEND_ERROR,
  LEGEND_VIEW,
} from '../blocks';

/**
 * `providers` vs `viewProviders`.
 *
 * Both [b] and [c] have one view child (declared in their own template)
 * and one content child (declared here and projected with `<ng-content>`).
 * The content child of [c] does not see its `viewProviders`.
 *
 * The template is written by hand to make the content projection explicit.
 */
@Component({
  selector: 'app-view-providers',
  template: `
    <h2 class="header">{{ title }}</h2>

    <app-env-injectors />

    <div #container class="block-container">
      <div class="block-wrap">
        <div
          #block
          class="block block__none"
          [style.width.px]="rootWidth / depth"
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
        <app-block-providers [depth]="2" [blocksTree]="{ children: [{}] }">
          <app-block [depth]="3" projected />
        </app-block-providers>

        <app-block-view-providers [depth]="2" [blocksTree]="{ children: [{}] }">
          <app-block [depth]="3" projected />
        </app-block-view-providers>
      </div>
    </div>

    <div class="description" [innerHTML]="description"></div>
  `,
  imports: [BLOCK_IMPORTS],
})
export class AppViewProvidersComponent extends BlockComponent {
  override title = 'providers vs viewProviders';
  override description = legend(LEGEND_VIEW, LEGEND_CONTENT, LEGEND_ERROR);
}
