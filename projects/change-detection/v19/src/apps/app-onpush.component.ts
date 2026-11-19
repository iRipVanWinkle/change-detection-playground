import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlockLineDirective, BlockOnPushBrokenComponent, BlockOnPushComponent, BlockOnPushSignalComponent } from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';
import { legend, LEGEND_SIGNAL, LEGEND_NO_MARK_FOR_CHECK } from '../blocks/legend';

@Component({
  selector: 'app-onpush',
  templateUrl: '../blocks/block-onpush/block-onpush.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppOnPushComponent extends BlockOnPushComponent {
  override title = 'OnPush Change Detection Strategy';
  override description = legend(LEGEND_SIGNAL, LEGEND_NO_MARK_FOR_CHECK);


  override blocksTree = {
    component: BlockOnPushComponent,
    children: [
      {
        component: BlockOnPushComponent,
        children: [
          {
            component: BlockOnPushBrokenComponent
          },
          {
            component: BlockOnPushComponent
          }
        ]
      },
      {
        component: BlockOnPushComponent,
        children: [
          {
            component: BlockOnPushSignalComponent
          },
          {
            component: BlockOnPushComponent
          }
        ]
      }
    ]
  };
}
