import { ComponentRef, Directive, DoCheck, inject, Injector, input, inputBinding, OnInit, ViewContainerRef } from '@angular/core';
import type { BlockBase, BlocksTree } from './block-base';

@Directive({
  selector: '[blockOutlet]'
})
export class BlockOutletDirective implements OnInit, DoCheck {
  readonly blockOutlet = input.required<BlocksTree>();
  readonly blockOutletDepth = input.required<number>();

  private viewContainer = inject(ViewContainerRef);
  private injector = inject(Injector);

  private componentRef?: ComponentRef<BlockBase>;

  ngOnInit(): void {
    this.componentRef = this.viewContainer.createComponent(this.blockOutlet().component, {
      injector: this.injector,
      bindings: [
        inputBinding('blocksTree', this.blockOutlet),
        inputBinding('depth', this.blockOutletDepth),
      ],
    });
  }

  ngDoCheck(): void {
    this.componentRef?.instance.ngDoCheck();
  }
}
