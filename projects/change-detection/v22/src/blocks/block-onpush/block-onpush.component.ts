import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { BlockBase } from '../block-base';
import { BlockLineDirective } from '../block-line.directive';
import { BlockOutletDirective } from '../block-outlet.directive';
import { INTERVAL_DELAY } from '../constants';

@Component({
  selector: 'app-block-onpush',
  templateUrl: './block-onpush.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockOnPushComponent extends BlockBase {
  protected count: null | number = null;

  private changeDetectorRef = inject(ChangeDetectorRef);

  protected triggerInterval() {
    this.count = 0;

    clearInterval(this.intervalRef);

    this.intervalRef = setInterval(() => {
      this.count = (this.count ?? 0) + 1;

      // Marks this component and all its ancestors as dirty.
      this.changeDetectorRef.markForCheck();
    }, INTERVAL_DELAY);
  }
}
