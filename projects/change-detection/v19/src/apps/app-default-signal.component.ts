import { Component } from '@angular/core';
import { BlockDefaultSignalComponent, BlockLineDirective, BlockOnPushSignalComponent } from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';
import { legend, LEGEND_SIGNAL } from '../blocks/legend';

@Component({
  selector: 'app-default-signal',
  templateUrl: '../blocks/block-default-signal/block-default-signal.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
})
export class AppDefaultSignalComponent extends BlockOnPushSignalComponent {
  override title = 'Default Strategy with Signals';
  override description = legend(LEGEND_SIGNAL);


  override blocksTree = {
    component: BlockDefaultSignalComponent,
    children: [
      {
        component: BlockDefaultSignalComponent,
        children: [
          {
            component: BlockDefaultSignalComponent
          },
          {
            component: BlockDefaultSignalComponent
          }
        ]
      },
      {
        component: BlockOnPushSignalComponent,
        children: [
          {
            component: BlockOnPushSignalComponent
          },
          {
            component: BlockOnPushSignalComponent
          }
        ]
      }
    ]
  };
}
