import { Component } from '@angular/core';
import { BLOCK_IMPORTS, BlockComponent, BlocksTree, legend } from '../blocks';

/**
 * A directive can provide a service too.
 * Its provider lands in the `ElementInjector` of the element the directive sits on,
 * so the component on that element finds it even with `self`, and skips it with `skipSelf`.
 */
@Component({
  selector: 'app-directive',
  templateUrl: '../blocks/block.html',
  imports: [BLOCK_IMPORTS],
})
export class AppDirectiveComponent extends BlockComponent {
  override title = 'Directive providers';
  override description = legend();

  protected override rootTree: BlocksTree = {
    children: [
      {
        provide: 'directive',
        children: [{}, { provide: 'providers' }],
      },
      {
        children: [
          { provide: 'directive', inject: { self: true } },
          { provide: 'directive', inject: { skipSelf: true } },
        ],
      },
    ],
  };
}
