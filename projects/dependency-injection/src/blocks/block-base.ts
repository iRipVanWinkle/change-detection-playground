import {
  afterNextRender,
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  inject,
  Injector,
  input,
  InjectOptions,
  signal,
  viewChild,
} from '@angular/core';
import { DemoService } from '../helpers/demo.service';
import { InjectorView, LookupResult, Playground } from '../helpers/playground.service';
import { instanceColor, ROOT_BLOCK_WIDTH } from './constants';

/** What a block declares in its `@Component()` decorator. */
export type BlockKind = 'none' | 'providers' | 'viewProviders' | 'directive';

export interface BlocksTree {
  /**
   * Where `DemoService` is declared: in `providers` or `viewProviders` of the block,
   * in `providers` of a directive on its element, or nowhere.
   */
  provide?: 'providers' | 'viewProviders' | 'directive';
  /** Options the block passes to `inject(DemoService, options)`. */
  inject?: InjectOptions;
  /** Blocks rendered in the template of this block — its view children. */
  children?: BlocksTree[];
}

const LABELS: Record<BlockKind, string> = {
  none: 'no providers',
  providers: 'providers',
  viewProviders: 'viewProviders',
  directive: 'directive',
};

@Directive()
export abstract class BlockBase implements InjectorView {
  readonly depth = input(1);
  readonly blocksTree = input<BlocksTree>();

  /** Marks a block that is passed to its parent as content (`<ng-content>`). */
  readonly projected = input(false, { transform: booleanAttribute });

  // Root app components are bootstrapped without inputs, so they declare their tree here instead.
  protected rootTree?: BlocksTree;
  protected readonly tree = computed(() => this.blocksTree() ?? this.rootTree);

  title?: string;
  description?: string;

  abstract readonly kind: BlockKind;

  readonly id = signal('');
  readonly result = signal<LookupResult | null>(null);
  readonly instance = signal<DemoService | null>(null);

  readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected readonly rootWidth = ROOT_BLOCK_WIDTH;
  protected readonly instanceColor = instanceColor;

  /** The injector of this very component — the one `inject()` uses in its constructor. */
  private readonly injector = inject(Injector);
  private readonly playground = inject(Playground);

  private readonly blockEl = viewChild.required<ElementRef<HTMLElement>>('block');
  private readonly containerEl = viewChild.required<ElementRef<HTMLElement>>('container');

  constructor() {
    this.playground.registerBlock(this);

    afterNextRender(() => this.drawLine());
  }

  /**
   * Asks Angular for `DemoService` exactly as `inject(DemoService, options)`
   * in the constructor of this component would do.
   */
  lookup(): void {
    const options = this.tree()?.inject ?? {};

    try {
      const service = this.injector.get(DemoService, undefined, options);

      this.playground.show(this, options, service);
    } catch (error) {
      console.warn(`[${this.id()}]`, error);

      this.playground.show(this, options, error as Error);
    }
  }

  get label(): string {
    return LABELS[this.kind];
  }

  /** `{ skipSelf: true, optional: true }` → `skipSelf, optional` */
  get modifiers(): string {
    return Object.entries(this.tree()?.inject ?? {})
      .filter(([, enabled]) => enabled)
      .map(([name]) => name)
      .join(', ');
  }

  get element(): HTMLElement {
    return this.blockEl().nativeElement;
  }

  /** The block right above this one in the element tree. */
  get parent(): BlockBase | null {
    return this.playground.parentOf(this);
  }

  /** The block whose template declares this one — the place where a `host` lookup stops. */
  get hostBlock(): BlockBase | null {
    const parent = this.parent;

    return this.projected() ? (parent?.hostBlock ?? null) : parent;
  }

  /** Draws a line from this block to its parent. */
  private drawLine(): void {
    const parent = this.parent;

    if (!parent) {
      return;
    }

    const container = this.containerEl().nativeElement;
    const from = container.getBoundingClientRect();
    const to = parent.element.getBoundingClientRect();

    const x1 = from.left + from.width / 2;
    const y1 = from.top;
    const x2 = to.left + to.width / 2;
    const y2 = to.top + to.height;

    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    container.style.setProperty('--line-width', `${length}px`);
    container.style.setProperty('--line-rotate', `${angle}deg`);
  }
}
