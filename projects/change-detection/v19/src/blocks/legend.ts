import { INTERVAL_DELAY } from './constants';

/** A `[sign, explanation]` pair, both are HTML. */
export type LegendItem = [string, string];

const COMMON: LegendItem[] = [
  [
    '<div class="legend-color legend-color__checked"></div>',
    'Angular checked the template of this component.',
  ],
  [
    '<b class="legend-counter">1</b>',
    'The counter as the template shows it. It changes only when the view is refreshed.',
  ],
];

export const LEGEND_SIGNAL: LegendItem = ['⚡', 'The counter is a signal.'];

export const LEGEND_EMPTY_INTERVAL: LegendItem = [
  '⏳',
  'The <code>setInterval</code> callback is empty, nothing changes on a tick.',
];

export const LEGEND_DETACH: LegendItem = [
  '🚀',
  'The click calls <code>detach()</code>, then the component refreshes itself with <code>detectChanges()</code>.',
];

export const LEGEND_NO_MARK_FOR_CHECK: LegendItem = [
  '🛑',
  'The counter changes, but <code>markForCheck()</code> is not called.',
];

export const LEGEND_DO_CHECK: LegendItem = [
  '<b class="legend-do-check">OnPush</b>',
  'Angular called <code>ngDoCheck()</code> of this component.',
];

/** Builds the description box shown under a scenario. */
export function legend(...extra: LegendItem[]): string {
  const items = [...COMMON, ...extra]
    .map(([sign, explanation]) => `<dt>${sign}</dt><dd>${explanation}</dd>`)
    .join('');

  return `<div>
    <p>Click a component to start a <code>setInterval</code> that increments its counter every ${INTERVAL_DELAY / 1000}s.</p>
    <p><b>Legend</b></p>
    <dl>${items}</dl>
  </div>`;
}
