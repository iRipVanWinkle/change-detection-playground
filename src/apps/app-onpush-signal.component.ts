import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlockDefaultSignalComponent, BlockLineDirective, BlockOnPushSignalComponent } from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';

@Component({
  selector: 'app-onpush-signal',
  templateUrl: '../blocks/block-onpush-signal/block-onpush-signal.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppOnPushSignalComponent extends BlockOnPushSignalComponent {
  override title = 'OnPush Strategy with Signals';
  override description = `<div>
    <p><b>Legend</b></p>
    <dl>
      <dt>⚡</dt><dd>Angular component that uses a signal.</dd>
    </dl>
  </div>`;
  override blocksTree = {
    component: BlockOnPushSignalComponent,
    children: [
      {
        component: BlockDefaultSignalComponent,
        children: [
          {
            component: BlockDefaultSignalComponent
          },
          {
            component: BlockDefaultSignalComponent
          }
        ]
      },
      {
        component: BlockOnPushSignalComponent,
        children: [
          {
            component: BlockOnPushSignalComponent
          },
          {
            component: BlockOnPushSignalComponent
          }
        ]
      }
    ]
  };
}
