import { Component } from '@angular/core';
import { BlockBase } from '../block-base';
import { BlockLineDirective } from '../block-line.directive';
import { BlockOutletDirective } from '../block-outlet.directive';
import { INTERVAL_DELAY } from '../constants';

// `changeDetection` is deliberately omitted: since Angular 22 this means OnPush, not Eager.
@Component({
  selector: 'app-block-implicit',
  templateUrl: './block-implicit.component.html',
  imports: [BlockLineDirective, BlockOutletDirective]
})
export class BlockImplicitComponent extends BlockBase {
  protected count: null | number = null;

  protected triggerInterval() {
    this.count = 0;

    clearInterval(this.intervalRef);

    this.intervalRef = setInterval(() => {
      this.count = (this.count ?? 0) + 1;
    }, INTERVAL_DELAY);
  }
}
