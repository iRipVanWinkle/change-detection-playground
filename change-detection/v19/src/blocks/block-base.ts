import { ApplicationRef, ChangeDetectorRef, Component, DoCheck, ElementRef, inject, Input, NgZone, OnInit, Type, ViewChild } from '@angular/core';
import { IdentifierGenerator } from '../helpers/identifier-generator.service';

export interface BlocksTree {
  component: Type<BlockBase>;
  withDoCheck?: boolean;
  children?: BlocksTree[];
}

@Component({
  selector: 'app-block-base',
  template: ''
})
export class BlockBase implements OnInit, DoCheck {

  @Input() depth = 1;
  @Input() blocksTree?: BlocksTree;

  @Input() title?: string;
  @Input() description?: string;
  @Input() countInput?: number;

  id!: string;

  protected intervalRef?: ReturnType<typeof setInterval>;
  protected zoneRef = inject(NgZone);

  @ViewChild('block', { static: true }) private blockEl!: ElementRef;

  private idGenerator = inject(IdentifierGenerator);

  ngOnInit(): void {
    this.id = this.idGenerator.generateId();
  }

  ngDoCheck(): void {
    if (this.blocksTree?.withDoCheck) {
      this.highlightText();
    }
  }

  highlightBlock() {
    this.zoneRef.runOutsideAngular(() => {
      this.blockEl.nativeElement.animate({
        backgroundColor: ['yellow', 'white'],
      }, {
        fill: "forwards",
        easing: 'ease-in-out',
        duration: 700
      })
    });
  }

  highlightText() {
    this.zoneRef.runOutsideAngular(() => {
      this.blockEl.nativeElement.animate({
        color: ['#e06565', '#808080'],
      }, {
        fill: "forwards",
        easing: 'ease-in-out',
        duration: 700
      })
    });
  }
}
