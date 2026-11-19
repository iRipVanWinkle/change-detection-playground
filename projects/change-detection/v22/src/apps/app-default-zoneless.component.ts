import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BlockDefaultComponent,
  BlockDefaultSignalComponent,
  BlockLineDirective,
  BlockOnPushSignalComponent,
} from '../blocks';
import { BlockDefaultDetectChangesComponent } from '../blocks/block-default-detect-changes/block-default-detect-changes.component';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';
import { legend, LEGEND_SIGNAL, LEGEND_DETACH } from '../blocks/legend';

@Component({
  selector: 'app-default-zoneless',
  templateUrl: '../blocks/block-default/block-default.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [BlockLineDirective, BlockOutletDirective],
})
export class AppDefaultZonelessComponent extends BlockDefaultComponent {
  protected override title = 'Zoneless';
  protected override description = legend(LEGEND_SIGNAL, LEGEND_DETACH);

  protected override rootTree = {
    component: BlockDefaultComponent,
    children: [
      {
        component: BlockDefaultDetectChangesComponent,
        children: [
          {
            component: BlockDefaultComponent,
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
