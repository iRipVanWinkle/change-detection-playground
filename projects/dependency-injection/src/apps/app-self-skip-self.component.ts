import { Component } from '@angular/core';
import { BLOCK_IMPORTS, BlockComponent, BlocksTree, legend, LEGEND_ERROR } from '../blocks';

/**
 * `self` looks only at the injector of the component itself,
 * `skipSelf` starts the lookup from the parent.
 */
@Component({
  selector: 'app-self-skip-self',
  templateUrl: '../blocks/block.html',
  imports: [BLOCK_IMPORTS],
})
export class AppSelfSkipSelfComponent extends BlockComponent {
  override title = 'self & skipSelf';
  override description = legend(LEGEND_ERROR);

  override blocksTree: BlocksTree = {
    children: [
      {
        provide: 'providers',
        children: [
          { provide: 'providers', inject: { skipSelf: true } },
          { inject: { skipSelf: true } },
        ],
      },
      {
        children: [{ provide: 'providers', inject: { self: true } }, { inject: { self: true } }],
      },
    ],
  };
}
