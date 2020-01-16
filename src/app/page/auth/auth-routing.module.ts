import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuardService} from '../../service/auth.guard.service';
import {RecoverComponent} from './recover/recover.component';
import {ResetComponent} from './reset/reset.component';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuardService]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuardService]},
  {path: 'recover', component: RecoverComponent, canActivate: [AuthGuardService]},
  {path: 'reset', component: ResetComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
