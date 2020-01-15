import {NgModule} from '@angular/core';
import {ShareModule} from '../../share/share.module';
import {WaitRouterModule} from './wait-router.module';
import {WaitComponent} from './wait.component';

@NgModule({
  declarations: [
    WaitComponent
  ],
  imports: [
    ShareModule,
    WaitRouterModule
  ]
})
export class WaitModule {
}
