import { afterEveryRender, Directive, ElementRef, inject, input } from '@angular/core';

interface LineGeometry {
  length: number;
  angle: number;
}

@Directive({
  selector: '[blockLineTarget]',
})
export class BlockLineDirective {
  readonly targetEl = input<HTMLElement | null>(null, { alias: 'blockLineTarget' });

  private parent = inject(BlockLineDirective, { optional: true, skipSelf: true });
  private hostEl: HTMLElement = inject(ElementRef).nativeElement;

  constructor() {
    afterEveryRender({
      earlyRead: () => this.measureLineToParent(),
      write: (geometry) => this.drawLine(geometry),
    });
  }

  private measureLineToParent(): LineGeometry | null {
    const targetEl = this.parent?.targetEl();

    if (!targetEl) {
      return null;
    }

    const hostRect = this.hostEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    const x1 = hostRect.left + hostRect.width / 2;
    const y1 = hostRect.top;
    const x2 = targetRect.left + targetRect.width / 2;
    const y2 = targetRect.top + targetRect.height;

    return {
      length: Math.hypot(x2 - x1, y2 - y1),
      angle: Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI),
    };
  }

  private drawLine(geometry: LineGeometry | null) {
    if (geometry) {
      this.hostEl.style.setProperty('--line-width', `${geometry.length}px`);
      this.hostEl.style.setProperty('--line-rotate', `${geometry.angle}deg`);
    }
  }
}
