import { afterRender, ComponentRef, Directive, DoCheck, ElementRef, inject, Injector, Input, OnChanges, SimpleChanges, Type, ViewContainerRef } from "@angular/core";

@Directive({
  standalone: true,
  selector: '[blockOutlet]'
})
export class BlockOutletDirective implements OnChanges, DoCheck {
  @Input() blockOutlet!: Type<any>;
  @Input() blockOutletInputs?: Record<string, unknown>;;

  viewContainer = inject(ViewContainerRef);
  injector = inject(Injector);

  private componentRef?: ComponentRef<any>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['blockOutlet']) {
      this.loadComponent();
    }

    if (changes['blockOutletInputs'] && this.componentRef) {
      this.updateInputs();
    }
  }

  ngDoCheck(): void {
    if (this.componentRef) {
      this.componentRef.instance.ngDoCheck?.();
    }
  }

  private loadComponent() {
    this.viewContainer.clear();
    if (!this.blockOutlet) return;

    this.componentRef = this.viewContainer.createComponent(this.blockOutlet, { injector: this.injector });
    this.updateInputs();
  }

  private updateInputs() {
    if (this.componentRef && this.blockOutletInputs) {
      Object.entries(this.blockOutletInputs).forEach(([key, value]) => {
        this.componentRef!.setInput(key, value);
      });
    }
  }
}
