import {NgModule} from '@angular/core';
import {TorrentRouterModule} from './torrent-router.module';
import {TorrentListComponent} from './list/list.component';
import {ShareModule} from '../../share/share.module';
import {TorrentDetailComponent} from './detail/detail.component';
import {TorrentReleaseComponent} from './release/release.component';
import {TorrentWaitComponent} from './wait/wait.component';

@NgModule({
  declarations: [
    TorrentListComponent,
    TorrentDetailComponent,
    TorrentReleaseComponent,
    TorrentWaitComponent
  ],
  imports: [
    ShareModule,
    TorrentRouterModule
  ]
})
export class TorrentModule {
}
