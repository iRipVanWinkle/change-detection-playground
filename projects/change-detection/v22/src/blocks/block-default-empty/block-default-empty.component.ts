import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlockBase } from '../block-base';
import { BlockLineDirective } from '../block-line.directive';
import { BlockOutletDirective } from '../block-outlet.directive';
import { INTERVAL_DELAY } from '../constants';

@Component({
  selector: 'app-block-default-empty',
  templateUrl: './block-default-empty.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
  changeDetection: ChangeDetectionStrategy.Eager
})
export class BlockDefaultEmptyComponent extends BlockBase {
  protected triggerInterval() {
    clearInterval(this.intervalRef);

    // The callback does nothing on purpose: Zone.js still triggers change detection on every tick.
    this.intervalRef = setInterval(() => {}, INTERVAL_DELAY);
  }
}
