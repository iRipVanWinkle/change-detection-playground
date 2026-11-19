import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BlockDefaultComponent,
  BlockDefaultSignalComponent,
  BlockLineDirective,
  BlockOnPushComponent,
  BlockOnPushSignalComponent,
} from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';

@Component({
  selector: 'app-default-with-onpush',
  templateUrl: '../blocks/block-default/block-default.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [BlockLineDirective, BlockOutletDirective],
})
export class AppDefaultWithOnPushComponent extends BlockDefaultComponent {
  protected override title = 'Eager Strategy with OnPush Strategy';
  protected override description = `<div>
    <p><b>Legend</b></p>
    <dl>
      <dt>⚡</dt><dd>Angular component that uses a signal.</dd>
    </dl>
  </div>`;

  protected override rootTree = {
    component: BlockDefaultComponent,
    children: [
      {
        component: BlockDefaultComponent,
        children: [
          {
            component: BlockDefaultSignalComponent,
          },
          {
            component: BlockDefaultComponent,
          },
        ],
      },
      {
        component: BlockOnPushComponent,
        children: [
          {
            component: BlockOnPushSignalComponent,
            children: [
              {
                component: BlockOnPushComponent,
              },
              {
                component: BlockOnPushComponent,
              },
            ],
          },
          {
            component: BlockOnPushComponent,
          },
        ],
      },
    ],
  };
}
