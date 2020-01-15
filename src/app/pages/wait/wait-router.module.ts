import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {IndexGuardService} from '../../service/index.guard.service';
import {WaitComponent} from './wait.component';

const routes: Routes = [
  {path: '', component: WaitComponent, canActivate: [IndexGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaitRouterModule {
}
