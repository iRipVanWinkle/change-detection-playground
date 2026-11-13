import type { DemoService } from '../helpers/demo.service';

/** Width of the root block; a block on level N is N times narrower. */
export const ROOT_BLOCK_WIDTH = 450;

/** Pause between two neighbouring injectors while a lookup is animated. */
export const STEP_DELAY = 300;

export const COLORS = {
  /** The injector was asked for the service. */
  visited: 'yellow',
  /** The injector has the provider. */
  found: '#9be89b',
  /** Nobody has the provider. */
  error: '#e06565',
};

/** Every instance gets its own color, so shared instances are easy to spot. */
const INSTANCE_COLORS = [
  '#2a9d8f',
  '#e07a3f',
  '#5e60ce',
  '#d6478f',
  '#52a447',
  '#b8860b',
  '#3a86c8',
];

export function instanceColor(service: DemoService): string {
  return INSTANCE_COLORS[(service.id - 1) % INSTANCE_COLORS.length];
}
