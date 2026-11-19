import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlockBase } from '../block-base';
import { BlockLineDirective } from '../block-line.directive';
import { BlockOutletDirective } from '../block-outlet.directive';
import { INTERVAL_DELAY } from '../constants';

@Component({
  selector: 'app-block-onpush-broken',
  templateUrl: './block-onpush-broken.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockOnPushBrokenComponent extends BlockBase {
  protected count: null | number = null;

  protected triggerInterval() {
    this.count = 0;

    clearInterval(this.intervalRef);

    // markForCheck() is intentionally missing, so the counter only updates
    // when something else marks this component dirty.
    this.intervalRef = setInterval(() => {
      this.count = (this.count ?? 0) + 1;
    }, INTERVAL_DELAY);
  }
}
