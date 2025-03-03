import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from "@angular/core";
import { NgComponentOutlet } from "@angular/common";
import { BlockBase } from "../block-base";
import { BlockLineDirective } from "../block-line.directive";
import { INTERVAL_DELAY } from "../constants";
import { BlockOutletDirective } from "../block-outlet.directive";

@Component({
  selector: 'app-block-onpush',
  standalone: true,
  templateUrl: './block-onpush.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockOnPushComponent extends BlockBase {
  count: null | number = null;

  private changeDetectorRef = inject(ChangeDetectorRef)

  triggerInterval() {
    // Initialize counter value
    this.count = 0;

    // Stop the previous interval if it exists
    clearInterval(this.intervalRef);

    // Start a new interval
    this.intervalRef = setInterval(() => {
      // Increment the counter by 1
      this.count = (this.count ?? 0) + 1;

      // Mark the current component and all its ancestors as “dirty”
      this.changeDetectorRef.markForCheck();
    }, INTERVAL_DELAY);
  }
}
