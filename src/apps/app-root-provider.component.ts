import { Component } from '@angular/core';
import { BLOCK_IMPORTS, BlockComponent, BlocksTree, legend } from '../blocks';

/**
 * Nobody in the component tree provides `DemoService`,
 * so every lookup ends in the root injector and everybody shares one instance.
 */
@Component({
  selector: 'app-root-provider',
  templateUrl: '../blocks/block.html',
  imports: [BLOCK_IMPORTS],
})
export class AppRootProviderComponent extends BlockComponent {
  override title = "Root provider — providedIn: 'root'";
  override description = legend();

  override blocksTree: BlocksTree = {
    children: [
      {
        children: [{}, {}],
      },
      {
        children: [{}, {}],
      },
    ],
  };
}
