import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UserDetailComponent} from './detail/detail.component';
import {IndexGuardService} from '../../service/index.guard.service';
import {UserSettingComponent} from './setting/setting.component';

const routes: Routes = [
  {path: '', component: UserDetailComponent, canActivate: [IndexGuardService]},
  {path: 'detail', component: UserDetailComponent, canActivate: [IndexGuardService]},
  {path: 'setting', component: UserSettingComponent, canActivate: [IndexGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouterModule {
}
