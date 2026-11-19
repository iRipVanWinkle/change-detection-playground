import { Component } from '@angular/core';
import { BLOCK_IMPORTS, BlockComponent, BlocksTree, legend } from '../blocks';

/**
 * A component with `providers` creates its own instance.
 * It is shared with everything below that component and hides the root one.
 */
@Component({
  selector: 'app-providers',
  templateUrl: '../blocks/block.html',
  imports: [BLOCK_IMPORTS],
})
export class AppProvidersComponent extends BlockComponent {
  override title = 'Component providers';
  override description = legend();

  override blocksTree: BlocksTree = {
    children: [
      {
        provide: 'providers',
        children: [{}, {}],
      },
      {
        children: [{ provide: 'providers' }, {}],
      },
    ],
  };
}
