import { Component } from '@angular/core';
import { BlockDefaultComponent, BlockDefaultSignalComponent, BlockLineDirective, BlockOnPushSignalComponent } from '../blocks';
import { BlockDefaultDetectChangesComponent } from '../blocks/block-default-detect-changes/block-default-detect-changes.component';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';


@Component({
  selector: 'app-default-zoneless',
  templateUrl: '../blocks/block-default/block-default.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
})
export class AppDefaultZonelessComponent extends BlockDefaultComponent {
  override title = 'Zoneless';
  override description = `<div>
    <p><b>Legend</b></p>
    <dl>
      <dt>⚡</dt><dd>Angular component that uses a signal.</dd>
      <dt>🚀</dt><dd>Angular component where <code>detach</code> is called after click.</dd>
    </dl>
  </div>`;

  override blocksTree = {
    component: BlockDefaultComponent,
    children: [
      {
        component: BlockDefaultDetectChangesComponent,
        children: [
          {
            component: BlockDefaultComponent
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
