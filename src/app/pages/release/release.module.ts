import {NgModule} from '@angular/core';
import {ShareModule} from '../../share/share.module';
import {ReleaseComponent} from './release.component';
import {ReleaseRouterModule} from './release-router.module';

@NgModule({
  declarations: [
    ReleaseComponent
  ],
  imports: [
    ShareModule,
    ReleaseRouterModule
  ]
})
export class ReleaseModule {
}
