import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlockLineDirective, BlockOnPushContentComponent } from '../blocks';

@Component({
  selector: 'app-onpush-content',
  template: `
      @if (title) {
        <h2 class="header">{{ title }}</h2>
      }
      <div class="block-container" [blockLineTarget]="block">
        <div class="block-wrap">
          <div #block class="block block__blue" [style.width.px]="400 / depth" (click)="triggerInterval()">
            <i class="id">{{ id }}</i>
            <p>OnPush</p>
            <strong class="counter">{{ count }}</strong>
          </div>
        </div>

        <div class="block-inner">
          <app-block-onpush-content [depth]="2">
            <app-block-onpush-content [depth]="3"></app-block-onpush-content>
            <app-block-onpush-content [depth]="3"></app-block-onpush-content>
          </app-block-onpush-content>
          <app-block-onpush-content [depth]="2">
            <app-block-onpush-content [depth]="3"></app-block-onpush-content>
            <app-block-onpush-content [depth]="3"></app-block-onpush-content>
          </app-block-onpush-content>
        </div>
      </div>

    {{ highlightBlock() }}
    @if (description) {
      <div class="description" [innerHTML]="description"></div>
    }
    `,
  imports: [BlockOnPushContentComponent, BlockLineDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppOnPushContentComponent extends BlockOnPushContentComponent {
  override title = 'OnPush Change Detection Strategy';
  override description = ``;
}
