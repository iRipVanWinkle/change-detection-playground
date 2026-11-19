import { Component } from '@angular/core';
import { BlockDefaultSignalComponent, BlockLineDirective, BlockOnPushSignalComponent } from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';

@Component({
  selector: 'app-default-signal',
  templateUrl: '../blocks/block-default-signal/block-default-signal.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
})
export class AppDefaultSignalComponent extends BlockOnPushSignalComponent {
  override title = 'Default Strategy with Signals';
  override description = `<div>
    <p><b>Legend</b></p>
    <dl>
      <dt>⚡</dt><dd>Angular component that uses a signal.</dd>
    </dl>
  </div>`;


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
