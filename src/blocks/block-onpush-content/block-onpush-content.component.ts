import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from "@angular/core";
import { BlockBase } from "../block-base";
import { BlockLineDirective } from "../block-line.directive";
import { INTERVAL_DELAY } from "../constants";

@Component({
  selector: 'app-block-onpush-content',
  standalone: true,
  templateUrl: './block-onpush-content.component.html',
  imports: [BlockLineDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockOnPushContentComponent extends BlockBase {
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
