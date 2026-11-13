import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlockLineDirective, BlockOnPushBrokenComponent, BlockOnPushComponent, BlockOnPushSignalComponent } from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';

@Component({
  selector: 'app-onpush',
  templateUrl: '../blocks/block-onpush/block-onpush.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppOnPushComponent extends BlockOnPushComponent {
  override title = 'OnPush Change Detection Strategy';
  override description = `<div>
    <p><b>Legend</b></p>
    <dl>
      <dt>⚡</dt><dd>Angular component that uses a signal.</dd>
      <dt>🛑</dt><dd>Angular component where <code>markForCheck()</code> is not called.</dd>
    </dl>
  </div>`;


  override blocksTree = {
    component: BlockOnPushComponent,
    children: [
      {
        component: BlockOnPushComponent,
        children: [
          {
            component: BlockOnPushBrokenComponent
          },
          {
            component: BlockOnPushComponent
          }
        ]
      },
      {
        component: BlockOnPushComponent,
        children: [
          {
            component: BlockOnPushSignalComponent
          },
          {
            component: BlockOnPushComponent
          }
        ]
      }
    ]
  };
}
