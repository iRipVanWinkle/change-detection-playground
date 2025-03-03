import { afterRender, Directive, ElementRef, inject, Input } from "@angular/core";

@Directive({
  standalone: true,
  selector: '[blockLineTarget]'
})
export class BlockLineDirective {
  @Input('blockLineTarget') targetEl: HTMLDivElement | null = null;

  parent = inject(BlockLineDirective, { optional: true, skipSelf: true });
  elementRef = inject(ElementRef, { host: true });

  constructor() {
    afterRender(() => this.setLine());
  }

  private setLine() {
    const hostEl = this.elementRef.nativeElement;
    const targetEl = this.parent?.targetEl;

    if (targetEl) {
      let pos1 = hostEl.getBoundingClientRect();
      let pos2 = targetEl.getBoundingClientRect();

      let x1 = pos1.left + pos1.width / 2;
      let y1 = pos1.top;
      let x2 = pos2.left + pos2.width / 2;
      let y2 = pos2.top + pos2.height;

      let length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      let angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

      hostEl.style.setProperty('--line-width', `${length}px`);
      hostEl.style.setProperty('--line-rotate', `${angle}deg`);
    }
  }
}
