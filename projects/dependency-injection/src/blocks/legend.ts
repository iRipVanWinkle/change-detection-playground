/** A `[sign, explanation]` pair, both are HTML. */
export type LegendItem = [string, string];

const COMMON: LegendItem[] = [
  [
    '<div class="legend-color legend-color__visited"></div>',
    'The injector was asked for <code>DemoService</code> during the lookup.',
  ],
  [
    '<div class="legend-color legend-color__found"></div>',
    'The provider is found in this injector.',
  ],
  [
    '<b class="legend-result">#1</b>',
    'The instance the component received. Same number — same instance.',
  ],
  [
    '<span class="instance legend-instance">#1</span>',
    'The injector that created this instance and keeps it.',
  ],
];

export const LEGEND_ERROR: LegendItem = [
  '<b class="legend-error">✗</b>',
  '<code>NullInjectorError</code> — nobody on the way provides <code>DemoService</code>.',
];

export const LEGEND_NULL: LegendItem = [
  '<b class="legend-null">null</b>',
  'Nothing is found, but the dependency is <code>optional</code>.',
];

export const LEGEND_CONTENT: LegendItem = [
  '<div class="legend-line legend-line__projected"></div>',
  'A content child: the component is projected into its parent with <code>&lt;ng-content&gt;</code>.',
];

export const LEGEND_VIEW: LegendItem = [
  '<div class="legend-line"></div>',
  'A view child: the component is declared in the template of its parent.',
];

export const LEGEND_TEMPLATE: LegendItem = [
  '<div class="legend-line legend-line__template"></div>',
  'Rendered from an <code>&lt;ng-template&gt;</code> declared in the template of another component: ' +
    'the lookup starts from the place of declaration.',
];

export const LEGEND_OUTLET: LegendItem = [
  '<small class="legend-modifier">outlet</small>',
  "<code>ngTemplateOutletInjector: 'outlet'</code> — the template rendered here looks up from here.",
];

/** Builds the description box shown under a scenario. */
export function legend(...extra: LegendItem[]): string {
  const items = [...COMMON, ...extra]
    .map(([sign, explanation]) => `<dt>${sign}</dt><dd>${explanation}</dd>`)
    .join('');

  return `<div>
    <p>Click a component to make it call <code>inject(DemoService)</code>.</p>
    <p><b>Legend</b></p>
    <dl>${items}</dl>
  </div>`;
}
