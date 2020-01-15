import {NgModule} from '@angular/core';
import {TorrentsRouterModule} from './torrents-router.module';
import {TorrentsComponent} from './torrents.component';
import {ShareModule} from '../../share/share.module';

@NgModule({
  declarations: [
    TorrentsComponent
  ],
  imports: [
    ShareModule,
    TorrentsRouterModule
  ]
})
export class TorrentsModule {
}
