import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BlockDefaultSignalComponent,
  BlockLineDirective,
  BlockOnPushSignalComponent,
} from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';
import { legend, LEGEND_SIGNAL } from '../blocks/legend';

@Component({
  selector: 'app-onpush-signal',
  templateUrl: '../blocks/block-onpush-signal/block-onpush-signal.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppOnPushSignalComponent extends BlockOnPushSignalComponent {
  protected override title = 'OnPush Strategy with Signals';
  protected override description = legend(LEGEND_SIGNAL);
  protected override rootTree = {
    component: BlockOnPushSignalComponent,
    children: [
      {
        component: BlockDefaultSignalComponent,
        children: [
          {
            component: BlockDefaultSignalComponent,
          },
          {
            component: BlockDefaultSignalComponent,
          },
        ],
      },
      {
        component: BlockOnPushSignalComponent,
        children: [
          {
            component: BlockOnPushSignalComponent,
          },
          {
            component: BlockOnPushSignalComponent,
          },
        ],
      },
    ],
  };
}
