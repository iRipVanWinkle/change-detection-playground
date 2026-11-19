import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlockBase } from '../block-base';
import { BlockLineDirective } from '../block-line.directive';
import { BlockOutletDirective } from '../block-outlet.directive';
import { INTERVAL_DELAY } from '../constants';

@Component({
  selector: 'app-block-default',
  templateUrl: './block-default.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
  changeDetection: ChangeDetectionStrategy.Eager
})
export class BlockDefaultComponent extends BlockBase {
  protected count: null | number = null;

  protected triggerInterval() {
    this.count = 0;

    clearInterval(this.intervalRef);

    this.intervalRef = setInterval(() => {
      this.count = (this.count ?? 0) + 1;
    }, INTERVAL_DELAY);
  }
}
