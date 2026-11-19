import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlockDefaultComponent, BlockDefaultSignalComponent, BlockLineDirective } from '../blocks';
import { BlockDefaultDetectChangesComponent } from '../blocks/block-default-detect-changes/block-default-detect-changes.component';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';
import { legend, LEGEND_SIGNAL, LEGEND_DETACH } from '../blocks/legend';

@Component({
  selector: 'app-default-manual',
  templateUrl: '../blocks/block-default/block-default.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [BlockLineDirective, BlockOutletDirective],
})
export class AppDefaultManualComponent extends BlockDefaultComponent {
  protected override title = 'Manual Change Detection';
  protected override description = legend(LEGEND_SIGNAL, LEGEND_DETACH);

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
            component: BlockDefaultComponent,
          },
        ],
      },
      {
        component: BlockDefaultDetectChangesComponent,
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
