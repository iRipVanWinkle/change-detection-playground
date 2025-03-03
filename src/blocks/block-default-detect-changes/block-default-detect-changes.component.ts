import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { BlockBase } from "../block-base";
import { BlockLineDirective } from "../block-line.directive";
import { INTERVAL_DELAY } from "../constants";
import { BlockOutletDirective } from "../block-outlet.directive";


@Component({
  selector: 'app-block-default-detect-changes',
  standalone: true,
  templateUrl: './block-default-detect-changes.component.html',
  imports: [BlockLineDirective, BlockOutletDirective]
})
export class BlockDefaultDetectChangesComponent extends BlockBase {
  count: null | number = null;

  private changeDetectorRef = inject(ChangeDetectorRef)

  triggerInterval() {
    // Initialize counter value
    this.count = 0;

    // Detaches this view from the change-detection tree.
    this.changeDetectorRef.detach();
    this.changeDetectorRef.detectChanges();

    // Stop the previous interval if it exists
    clearInterval(this.intervalRef);

    // Run the interval logic outside Angular's zone
    this.zoneRef.runOutsideAngular(() => {
      // Start a new interval
      this.intervalRef = setInterval(() => {
        // Increment the counter by 1
        this.count = (this.count ?? 0) + 1;

        // Manually trigger change detection since it's detached
        this.changeDetectorRef.detectChanges();
      }, INTERVAL_DELAY);
    });
  }
}
