import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BlockDefaultComponent,
  BlockDefaultEmptyComponent,
  BlockDefaultSignalComponent,
  BlockLineDirective,
} from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';
import { legend, LEGEND_SIGNAL, LEGEND_EMPTY_INTERVAL } from '../blocks/legend';

@Component({
  selector: 'app-default',
  templateUrl: '../blocks/block-default/block-default.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [BlockLineDirective, BlockOutletDirective],
})
export class AppDefaultComponent extends BlockDefaultComponent {
  protected override title = 'Eager Change Detection Strategy';
  protected override description = legend(LEGEND_SIGNAL, LEGEND_EMPTY_INTERVAL);

  protected override rootTree = {
    component: BlockDefaultComponent,
    children: [
      {
        component: BlockDefaultComponent,
        children: [
          {
            component: BlockDefaultComponent,
          },
          {
            component: BlockDefaultEmptyComponent,
          },
        ],
      },
      {
        component: BlockDefaultComponent,
        children: [
          {
            component: BlockDefaultSignalComponent,
          },
          {
            component: BlockDefaultComponent,
          },
        ],
      },
    ],
  };
}
