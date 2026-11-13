import { Component } from '@angular/core';
import {
  BLOCK_IMPORTS,
  BlockViewProvidersComponent,
  legend,
  LEGEND_CONTENT,
  LEGEND_ERROR,
  LEGEND_VIEW,
} from '../blocks';
import { DemoService } from '../helpers/demo.service';

/**
 * `host` and content projection.
 *
 * The host of a block is the component whose template declares it — not its parent element.
 * [d] and [f] are declared in the templates of [b] and [c], so the lookup stops there.
 * [e] and [g] are declared here, in the template of [a], and only projected into [b] and [c]:
 * for them [b] and [c] are ordinary ancestors, and the lookup stops at [a].
 *
 * The template is written by hand to make the content projection explicit.
 */
@Component({
  selector: 'app-host-content',
  template: `
    <h2 class="header">{{ title }}</h2>

    <app-env-injectors />

    <div #container class="block-container">
      <div class="block-wrap">
        <div
          #block
          class="block block__viewProviders"
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

          @if (instance(); as service) {
            <span class="instance" [style.background-color]="instanceColor(service)"
              >#{{ service.id }}</span
            >
          }
        </div>
      </div>

      <div class="block-inner">
        <app-block [depth]="2" [blocksTree]="{ children: [{ inject: { host: true } }] }">
          <app-block [depth]="3" projected [blocksTree]="{ inject: { host: true } }" />
        </app-block>

        <app-block-providers [depth]="2" [blocksTree]="{ children: [{ inject: { host: true } }] }">
          <app-block [depth]="3" projected [blocksTree]="{ inject: { host: true } }" />
        </app-block-providers>
      </div>
    </div>

    <div class="description" [innerHTML]="description"></div>
  `,
  imports: [BLOCK_IMPORTS],
  viewProviders: [DemoService],
})
export class AppHostContentComponent extends BlockViewProvidersComponent {
  override title = 'host & <ng-content>';
  override description = legend(LEGEND_VIEW, LEGEND_CONTENT, LEGEND_ERROR);
}
