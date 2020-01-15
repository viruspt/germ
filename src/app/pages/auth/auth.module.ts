import {NgModule} from '@angular/core';

import {ShareModule} from '../../share/share.module';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthHeaderComponent} from './auth-header/auth-header.component';
import {RecoverComponent} from './recover/recover.component';
import {ResetComponent} from './reset/reset.component';


@NgModule({
  imports: [
    AuthRoutingModule,
    ShareModule,
  ],
  declarations: [
    AuthHeaderComponent,
    LoginComponent,
    RegisterComponent,
    RecoverComponent,
    ResetComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    RecoverComponent,
    ResetComponent,
  ]
})
export class AuthModule {
}
