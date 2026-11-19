import {
  afterNextRender,
  ElementRef,
  inject,
  Injectable,
  InjectionToken,
  InjectOptions,
  WritableSignal,
} from '@angular/core';
import type { BlockBase } from '../blocks/block-base';
import { COLORS, instanceColor, STEP_DELAY } from '../blocks/constants';
import type { DemoService } from './demo.service';

/** `true` when the scenario registers `DemoService` in the root `EnvironmentInjector`. */
export const ROOT_PROVIDES = new InjectionToken<boolean>('ROOT_PROVIDES');

/** Something on the screen that stands for an injector: a block or one of the pills above the tree. */
export interface InjectorView {
  readonly element: HTMLElement;
  /** The `DemoService` instance that lives in this injector (shown once it is created). */
  readonly instance: WritableSignal<DemoService | null>;
}

/** The `EnvironmentInjector` hierarchy that sits above the component tree. */
export interface EnvInjectorViews {
  readonly root: InjectorView;
  readonly platform: InjectorView;
  readonly nullInjector: InjectorView;
}

/** What a block shows after the lookup. */
export interface LookupResult {
  readonly text: string;
  readonly color: string;
  readonly title: string;
}

/**
 * Everything that is NOT part of the demo itself: block ids, lines' bookkeeping
 * and the animation of a lookup. One instance per bootstrapped application.
 *
 * The lookup itself is always done by Angular (see `BlockBase.lookup()`),
 * this class only shows on the screen what has just happened.
 */
@Injectable()
export class Playground {
  /** Set by `EnvInjectorsComponent`. */
  env!: EnvInjectorViews;

  readonly rootProvides = inject(ROOT_PROVIDES, { optional: true }) ?? false;

  private readonly blocks = new Map<HTMLElement, BlockBase>();
  private readonly homes = new WeakMap<DemoService, HTMLElement | null>();
  private instances = 0;

  constructor() {
    afterNextRender(() => this.assignIds());
  }

  registerBlock(block: BlockBase): void {
    this.blocks.set(block.hostElement, block);
  }

  /**
   * Called from the `DemoService` constructor, so `inject()` here runs in the context
   * of the injector that creates the instance. That is how we learn where the instance lives:
   * - an `ElementInjector` resolves `ElementRef` to the element that declares the provider;
   * - an `EnvironmentInjector` knows nothing about elements.
   */
  registerInstance(service: DemoService): number {
    const host = inject<ElementRef<HTMLElement>>(ElementRef, { optional: true });
    this.homes.set(service, host?.nativeElement ?? null);

    return ++this.instances;
  }

  /** The closest block above the given one in the element tree. */
  parentOf(block: BlockBase): BlockBase | null {
    let element = block.hostElement.parentElement;

    while (element) {
      const parent = this.blocks.get(element);
      if (parent) {
        return parent;
      }
      element = element.parentElement;
    }

    return null;
  }

  /** Shows a lookup that Angular has just performed for the `origin` block. */
  show(origin: BlockBase, options: InjectOptions, outcome: DemoService | null | Error): void {
    const service = outcome instanceof Error ? null : outcome;
    const home = service ? this.homeOf(service) : null;
    let path = this.lookupPath(origin, options, home);

    if (home && path.at(-1) !== home) {
      console.warn('The instance was found outside of the expected lookup path', origin, home);
      path = [home];
    }

    path.forEach((view, index) => {
      const isLast = index === path.length - 1;
      let color = COLORS.visited;

      if (isLast && home) {
        color = COLORS.found;
      } else if (outcome instanceof Error && view === this.env.nullInjector) {
        color = COLORS.error;
      }

      view.element.animate(
        { backgroundColor: [color, 'white'] },
        { delay: index * STEP_DELAY, duration: 700, easing: 'ease-in-out' },
      );
    });

    // Reveal the result at the moment the animation reaches the end of the path
    setTimeout(
      () => {
        if (service && home) {
          home.instance.set(service);
        }

        origin.result.set(this.toResult(outcome));

        if (outcome instanceof Error) {
          origin.element.animate(
            { color: [COLORS.error, '#808080'] },
            { duration: 700, easing: 'ease-in-out' },
          );
        }
      },
      Math.max(path.length - 1, 0) * STEP_DELAY,
    );
  }

  /**
   * The injectors Angular goes through, in order:
   * first the `ElementInjector`s (from the block up to the root component),
   * then the `EnvironmentInjector`s (root → platform → NullInjector).
   */
  private lookupPath(
    origin: BlockBase,
    options: InjectOptions,
    home: InjectorView | null,
  ): InjectorView[] {
    const path: InjectorView[] = [];
    const hostBlock = origin.hostBlock;
    let block = options.skipSelf ? origin.parent : origin;

    while (block) {
      path.push(block);

      if (block === home) {
        return path;
      }
      if (options.self || (options.host && block === hostBlock)) {
        break;
      }

      block = block.parent;
    }

    // `self` and `host` never leave the ElementInjector hierarchy
    if (options.self || options.host) {
      return path;
    }

    path.push(this.env.root);

    if (home !== this.env.root) {
      path.push(this.env.platform, this.env.nullInjector);
    }

    return path;
  }

  private homeOf(service: DemoService): InjectorView | null {
    const host = this.homes.get(service);

    return host ? (this.blocks.get(host) ?? null) : this.env.root;
  }

  private toResult(outcome: DemoService | null | Error): LookupResult {
    if (outcome instanceof Error) {
      return { text: '✗', color: COLORS.error, title: outcome.message };
    }

    if (outcome === null) {
      return { text: 'null', color: '#a0a0a0', title: 'Nothing is found, `optional` returns null' };
    }

    return {
      text: `#${outcome.id}`,
      color: instanceColor(outcome),
      title: `DemoService instance #${outcome.id}`,
    };
  }

  /** Letters go level by level, left to right: [a] is the root, [b] and [c] are its children… */
  private assignIds(): void {
    [...this.blocks.values()]
      .sort(
        (a, b) =>
          a.depth - b.depth ||
          (a.hostElement.compareDocumentPosition(b.hostElement) & Node.DOCUMENT_POSITION_FOLLOWING
            ? -1
            : 1),
      )
      .forEach((block, index) => block.id.set(String.fromCharCode(97 + index)));
  }
}
