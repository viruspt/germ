import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TorrentListComponent} from './list/list.component';
import {IndexGuardService} from '../../service/index.guard.service';
import {TorrentDetailComponent} from './detail/detail.component';
import {TorrentReleaseComponent} from './release/release.component';
import {TorrentWaitComponent} from './wait/wait.component';

const routes: Routes = [
  {path: '', component: TorrentListComponent, canActivate: [IndexGuardService]},
  {path: 'list', component: TorrentListComponent, canActivate: [IndexGuardService]},
  {path: 'detail', component: TorrentDetailComponent, canActivate: [IndexGuardService]},
  {path: 'release', component: TorrentReleaseComponent, canActivate: [IndexGuardService]},
  {path: 'wait', component: TorrentWaitComponent, canActivate: [IndexGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TorrentRouterModule {
}
