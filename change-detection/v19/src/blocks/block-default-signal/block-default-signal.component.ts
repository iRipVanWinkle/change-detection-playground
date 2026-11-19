import { Component, signal } from "@angular/core";
import { BlockBase } from "../block-base";
import { BlockLineDirective } from "../block-line.directive";
import { INTERVAL_DELAY } from "../constants";
import { BlockOutletDirective } from "../block-outlet.directive";

@Component({
  selector: 'app-block-default-signal',
  standalone: true,
  templateUrl: './block-default-signal.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
})
export class BlockDefaultSignalComponent extends BlockBase {
  count = signal<number | null>(null);

  triggerInterval() {
    // Initialize counter value
    this.count.set(0);

    // Stop the previous interval if it exists
    clearInterval(this.intervalRef);

    // Start a new interval
    this.intervalRef = setInterval(() => {
      // Increment the counter by 1
      this.count.update(i => (i ?? 0) + 1);
    }, INTERVAL_DELAY);
  }
}
