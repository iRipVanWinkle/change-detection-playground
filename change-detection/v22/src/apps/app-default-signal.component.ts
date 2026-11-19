import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlockDefaultSignalComponent, BlockLineDirective, BlockOnPushSignalComponent } from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';

@Component({
  selector: 'app-default-signal',
  templateUrl: '../blocks/block-default-signal/block-default-signal.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [BlockLineDirective, BlockOutletDirective],
})
export class AppDefaultSignalComponent extends BlockOnPushSignalComponent {
  protected override title = 'Eager Strategy with Signals';
  protected override description = `<div>
    <p><b>Legend</b></p>
    <dl>
      <dt>⚡</dt><dd>Angular component that uses a signal.</dd>
    </dl>
  </div>`;


  protected override rootTree = {
    component: BlockDefaultSignalComponent,
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
