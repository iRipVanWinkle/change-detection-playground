import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlockDefaultComponent, BlockLineDirective, BlockOnPushComponent } from '../blocks';
import { BlockOutletDirective } from '../blocks/block-outlet.directive';


@Component({
  selector: 'app-onpush-with-default',
  templateUrl: '../blocks/block-onpush/block-onpush.component.html',
  imports: [BlockLineDirective, BlockOutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppOnPushWithDefaultComponent extends BlockOnPushComponent {
  protected override title = 'OnPush Strategy with Eager Strategy';
  protected override description = ``;

  protected override rootTree = {
    component: BlockOnPushComponent,
    children: [
      {
        component: BlockOnPushComponent,
        children: [
          {
            component: BlockOnPushComponent
          },
          {
            component: BlockDefaultComponent,
            children: [
              {
                component: BlockOnPushComponent
              },
              {
                component: BlockDefaultComponent
              }
            ]
          },

        ]
      },
      {
        component: BlockOnPushComponent,
        children: [
          {
            component: BlockOnPushComponent
          },
          {
            component: BlockOnPushComponent
          }
        ]
      }
    ]
  };
}
