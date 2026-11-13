import { Component } from '@angular/core';
import { BlockDefaultComponent, BlockDefaultSignalComponent, BlockLineDirective } from '../blocks';
import { BlockDefaultDetectChangesComponent } from '../blocks/block-default-detect-changes/block-default-detect-changes.component';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';


@Component({
  selector: 'app-default-manual',
  templateUrl: '../blocks/block-default/block-default.component.html',
  imports: [BlockLineDirective, BlockOutletDirective]
})
export class AppDefaultManualComponent extends BlockDefaultComponent {

  override title = 'Manual Change Detection';
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
        component: BlockDefaultComponent,
        children: [
          {
            component: BlockDefaultComponent
          },
          {
            component: BlockDefaultComponent
          }
        ]
      },
      {
        component: BlockDefaultDetectChangesComponent,
        children: [
          {
            component: BlockDefaultSignalComponent
          },
          {
            component: BlockDefaultComponent
          }
        ]
      }
    ]
  };
}
