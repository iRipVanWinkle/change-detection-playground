import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BlockBase } from '../block-base';
import { BlockLineDirective } from '../block-line.directive';
import { BlockOutletDirective } from '../block-outlet.directive';
import { INTERVAL_DELAY } from '../constants';

@Component({
  selector: 'app-block-default-signal',
  templateUrl: './block-default-signal.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class BlockDefaultSignalComponent extends BlockBase {
  protected readonly count = signal<number | null>(null);

  protected triggerInterval() {
    this.count.set(0);

    clearInterval(this.intervalRef);

    this.intervalRef = setInterval(() => {
      this.count.update((i) => (i ?? 0) + 1);
    }, INTERVAL_DELAY);
  }
}
