import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {IndexGuardService} from '../../service/index.guard.service';
import {ReleaseComponent} from './release.component';

const routes: Routes = [
  {path: '', component: ReleaseComponent, canActivate: [IndexGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleaseRouterModule {
}
