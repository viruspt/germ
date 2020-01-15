import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TorrentsComponent} from './torrents.component';
import {IndexGuardService} from '../../service/index.guard.service';

const routes: Routes = [
  {path: '', component: TorrentsComponent, canActivate: [IndexGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TorrentsRouterModule {
}
