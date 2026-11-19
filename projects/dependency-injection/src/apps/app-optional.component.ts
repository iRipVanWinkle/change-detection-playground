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
 * The root injector does not provide `DemoService` here.
 * A lookup that finds nothing throws `NullInjectorError`, unless it is `optional`.
 */
@Component({
  selector: 'app-optional',
  templateUrl: '../blocks/block.html',
  imports: [BLOCK_IMPORTS],
})
export class AppOptionalComponent extends BlockComponent {
  override title = 'optional & NullInjectorError';
  override description = legend(LEGEND_ERROR, LEGEND_NULL);

  protected override rootTree: BlocksTree = {
    children: [
      {
        inject: { optional: true },
        children: [{ provide: 'providers' }, { inject: { self: true, optional: true } }],
      },
      {
        provide: 'providers',
        children: [{ inject: { optional: true } }, {}],
      },
    ],
  };
}
