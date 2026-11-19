import {
  computed,
  Directive,
  DoCheck,
  ElementRef,
  inject,
  input,
  NgZone,
  OnInit,
  Type,
  viewChild,
} from '@angular/core';
import { IdentifierGenerator } from '../helpers/identifier-generator.service';

export interface BlocksTree {
  component: Type<BlockBase>;
  withDoCheck?: boolean;
  children?: BlocksTree[];
}

@Directive()
export abstract class BlockBase implements OnInit, DoCheck {
  readonly depth = input(1);
  readonly blocksTree = input<BlocksTree>();

  protected title?: string;
  protected description?: string;

  // Root app components are bootstrapped without inputs, so they declare their tree here instead.
  protected rootTree?: BlocksTree;
  protected readonly tree = computed(() => this.blocksTree() ?? this.rootTree);

  protected id!: string;

  protected intervalRef?: ReturnType<typeof setInterval>;
  protected zoneRef = inject(NgZone);

  private blockEl = viewChild.required<ElementRef<HTMLElement>>('block');

  private idGenerator = inject(IdentifierGenerator);

  ngOnInit(): void {
    this.id = this.idGenerator.generateId();
  }

  ngDoCheck(): void {
    if (this.tree()?.withDoCheck) {
      this.highlightText();
    }
  }

  protected highlightBlock() {
    this.animateBlock({ backgroundColor: ['yellow', 'white'] });
  }

  protected highlightText() {
    this.animateBlock({ color: ['#e06565', '#808080'] });
  }

  private animateBlock(keyframes: PropertyIndexedKeyframes) {
    this.zoneRef.runOutsideAngular(() => {
      this.blockEl().nativeElement.animate(keyframes, {
        fill: 'forwards',
        easing: 'ease-in-out',
        duration: 700,
      });
    });
  }
}
