import { Component } from '@angular/core';
import { BlockDefaultComponent, BlockDefaultSignalComponent, BlockLineDirective, BlockOnPushComponent, BlockOnPushSignalComponent } from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';
import { legend, LEGEND_SIGNAL } from '../blocks/legend';

@Component({
  selector: 'app-default-with-onpush',
  templateUrl: '../blocks/block-default/block-default.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
})
export class AppDefaultWithOnPushComponent extends BlockDefaultComponent {

  override title = 'Default Strategy with OnPush Strategy';
  override description = legend(LEGEND_SIGNAL);

  override blocksTree = {
    component: BlockDefaultComponent,
    children: [
      {
        component: BlockDefaultComponent,
        children: [
          {
            component: BlockDefaultSignalComponent
          },
          {
            component: BlockDefaultComponent
          }
        ]
      },
      {
        component: BlockOnPushComponent,
        children: [
          {
            component: BlockOnPushSignalComponent,
            children: [
              {
                component: BlockOnPushComponent
              },
              {
                component: BlockOnPushComponent
              }
            ]
          },
          {
            component: BlockOnPushComponent
          }
        ]
      }
    ]
  };
}
