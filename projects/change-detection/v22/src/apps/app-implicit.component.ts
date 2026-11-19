import { Component } from '@angular/core';
import { BlockDefaultComponent, BlockImplicitComponent, BlockLineDirective } from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';
import { legend, LEGEND_IMPLICIT } from '../blocks/legend';

@Component({
  selector: 'app-implicit',
  templateUrl: '../blocks/block-implicit/block-implicit.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
})
export class AppImplicitComponent extends BlockImplicitComponent {
  protected override title = 'No Strategy: OnPush by Default (Angular 22)';
  protected override description = legend(LEGEND_IMPLICIT);

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
