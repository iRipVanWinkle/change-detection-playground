import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { BlockBase } from '../block-base';
import { BlockLineDirective } from '../block-line.directive';
import { BlockOutletDirective } from '../block-outlet.directive';
import { INTERVAL_DELAY } from '../constants';

@Component({
  selector: 'app-block-default-detect-changes',
  templateUrl: './block-default-detect-changes.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
  changeDetection: ChangeDetectionStrategy.Eager
})
export class BlockDefaultDetectChangesComponent extends BlockBase {
  protected count: null | number = null;

  private changeDetectorRef = inject(ChangeDetectorRef);

  protected triggerInterval() {
    this.count = 0;

    this.changeDetectorRef.detach();
    this.changeDetectorRef.detectChanges();

    clearInterval(this.intervalRef);

    // Outside the zone the interval doesn't trigger app-wide change detection,
    // so only this detached subtree gets refreshed by the explicit detectChanges().
    this.zoneRef.runOutsideAngular(() => {
      this.intervalRef = setInterval(() => {
        this.count = (this.count ?? 0) + 1;
        this.changeDetectorRef.detectChanges();
      }, INTERVAL_DELAY);
    });
  }
}
