import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlockLineDirective, BlockOnPushComponent, BlockOnPushSignalComponent } from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';
import { legend, LEGEND_SIGNAL, LEGEND_DO_CHECK } from '../blocks/legend';

@Component({
  selector: 'app-onpush-do-check',
  templateUrl: '../blocks/block-onpush/block-onpush.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppOnPushDoCheckComponent extends BlockOnPushComponent {
  protected override title = 'Change Detection & ngDoCheck()';
  protected override description = legend(LEGEND_SIGNAL, LEGEND_DO_CHECK);

  protected override rootTree = {
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
          },
        ],
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
          },
        ],
      },
    ],
  };
}
