import { Component } from "@angular/core";
import { BlockBase } from "../block-base";
import { BlockLineDirective } from "../block-line.directive";
import { INTERVAL_DELAY } from "../constants";
import { BlockOutletDirective } from "../block-outlet.directive";

@Component({
  selector: 'app-block-default-empty',
  standalone: true,
  templateUrl: './block-default-empty.component.html',
  imports: [BlockLineDirective, BlockOutletDirective]
})
export class BlockDefaultEmptyComponent extends BlockBase {
  triggerInterval() {
    // Stop the previous interval if it exists
    clearInterval(this.intervalRef);

    // Start a new interval
    this.intervalRef = setInterval(() => {
      // Do nothing
    }, INTERVAL_DELAY);
  }
}
