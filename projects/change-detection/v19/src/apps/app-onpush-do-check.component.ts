import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlockLineDirective, BlockOnPushComponent, BlockOnPushSignalComponent } from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';
import { legend, LEGEND_SIGNAL, LEGEND_DO_CHECK } from '../blocks/legend';

@Component({
  selector: 'app-onpush-do-check',
  templateUrl: '../blocks/block-onpush/block-onpush.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppOnPushDoCheckComponent extends BlockOnPushComponent {
  override title = 'Change Detection & ngDoCheck()';
  override description = legend(LEGEND_SIGNAL, LEGEND_DO_CHECK);


  override blocksTree = {
    component: BlockOnPushComponent,
    withDoCheck: true,
    children: [
      {
        component: BlockOnPushComponent,
        withDoCheck: true,
        children: [
          {
            component: BlockOnPushComponent,
            withDoCheck: true,
          },
          {
            component: BlockOnPushComponent,
            withDoCheck: true,
          }
        ]
      },
      {
        component: BlockOnPushSignalComponent,
        withDoCheck: true,
        children: [
          {
            component: BlockOnPushComponent,
            withDoCheck: true,
          },
          {
            component: BlockOnPushComponent,
            withDoCheck: true,
          }
        ]
      }
    ]
  };
}
