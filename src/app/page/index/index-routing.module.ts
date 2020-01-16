import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index.component';
import {IndexGuardService} from '../../service/index.guard.service';

const routes: Routes = [
  {path: '', component: IndexComponent, canActivate: [IndexGuardService]},
  {path: 'index', component: IndexComponent, canActivate: [IndexGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {
}
