import { Component } from '@angular/core';
import { BlockDefaultComponent, BlockDefaultEmptyComponent, BlockDefaultSignalComponent, BlockLineDirective } from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';


@Component({
  selector: 'app-default',
  templateUrl: '../blocks/block-default/block-default.component.html',
  imports: [BlockLineDirective, BlockOutletDirective]
})
export class AppDefaultComponent extends BlockDefaultComponent {

  override title = 'Default Change Detection Strategy';
  override description = `<div>
    <p><b>Legend</b></p>
    <dl>
      <dt>⚡</dt><dd>Angular component that uses a signal.</dd>
      <dt>⏳</dt><dd>Angular component where <code>setInterval</code> is empty.</dd>
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
            component: BlockDefaultEmptyComponent
          }
        ]
      },
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
      }
    ]
  };
}
