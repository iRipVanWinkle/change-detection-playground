import { Component } from '@angular/core';
import { BlockDefaultComponent, BlockImplicitComponent, BlockLineDirective } from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';

@Component({
  selector: 'app-implicit',
  templateUrl: '../blocks/block-implicit/block-implicit.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
})
export class AppImplicitComponent extends BlockImplicitComponent {
  protected override title = 'No Strategy: OnPush by Default (Angular 22)';
  protected override description = `<div>
    <p><b>Legend</b></p>
    <dl>
      <dt>❔</dt><dd>Angular component without <code>changeDetection</code>. Before v22 it was <code>Default</code>, now it is <code>OnPush</code>.</dd>
    </dl>
  </div>`;

  protected override rootTree = {
    component: BlockImplicitComponent,
    children: [
      {
        component: BlockImplicitComponent,
        children: [
          {
            component: BlockImplicitComponent,
          },
          {
            component: BlockDefaultComponent,
          },
        ],
      },
      {
        component: BlockDefaultComponent,
        children: [
          {
            component: BlockImplicitComponent,
          },
          {
            component: BlockDefaultComponent,
          },
        ],
      },
    ],
  };
}
