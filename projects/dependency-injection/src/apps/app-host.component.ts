import { Component } from '@angular/core';
import {
  BLOCK_IMPORTS,
  BlockComponent,
  BlocksTree,
  legend,
  LEGEND_ERROR,
  LEGEND_NULL,
} from '../blocks';

/**
 * `host` stops the lookup at the host component — the one whose template declares the block.
 * And on the host itself only `viewProviders` are visible, `providers` are not.
 */
@Component({
  selector: 'app-host',
  templateUrl: '../blocks/block.html',
  imports: [BLOCK_IMPORTS],
})
export class AppHostComponent extends BlockComponent {
  override title = 'host';
  override description = legend(LEGEND_ERROR, LEGEND_NULL);

  protected override rootTree: BlocksTree = {
    children: [
      {
        provide: 'viewProviders',
        children: [{ inject: { host: true } }, { provide: 'providers', inject: { host: true } }],
      },
      {
        provide: 'providers',
        children: [{ inject: { host: true } }, { inject: { host: true, optional: true } }],
      },
    ],
  };
}
