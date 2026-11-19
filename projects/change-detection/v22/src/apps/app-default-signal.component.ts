import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BlockDefaultSignalComponent,
  BlockLineDirective,
  BlockOnPushSignalComponent,
} from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';
import { legend, LEGEND_SIGNAL } from '../blocks/legend';

@Component({
  selector: 'app-default-signal',
  templateUrl: '../blocks/block-default-signal/block-default-signal.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [BlockLineDirective, BlockOutletDirective],
})
export class AppDefaultSignalComponent extends BlockOnPushSignalComponent {
  protected override title = 'Eager Strategy with Signals';
  protected override description = legend(LEGEND_SIGNAL);

  protected override rootTree = {
    component: BlockDefaultSignalComponent,
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
