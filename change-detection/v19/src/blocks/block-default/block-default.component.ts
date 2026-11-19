import { Component } from "@angular/core";
import { BlockBase } from "../block-base";
import { BlockLineDirective } from "../block-line.directive";
import { INTERVAL_DELAY } from "../constants";
import { BlockOutletDirective } from "../block-outlet.directive";


@Component({
  selector: 'app-block-default',
  standalone: true,
  templateUrl: './block-default.component.html',
  imports: [BlockLineDirective, BlockOutletDirective]
})
export class BlockDefaultComponent extends BlockBase {
  count: null | number = null;

  triggerInterval() {
    // Initialize counter value
    this.count = 0;

    // Stop the previous interval if it exists
    clearInterval(this.intervalRef);

    // Start a new interval
    this.intervalRef = setInterval(() => {
      // Increment the counter by 1
      this.count = (this.count ?? 0) + 1;
    }, INTERVAL_DELAY);
  }
}
