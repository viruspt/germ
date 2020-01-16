import {NgModule} from '@angular/core';
import {ShareModule} from '../../share/share.module';
import {UserDetailComponent} from './detail/detail.component';
import {UserRouterModule} from './user-router.module';
import {ClipboardModule} from 'ngx-clipboard';
import {UserSettingComponent} from './setting/setting.component';

@NgModule({
  declarations: [
    UserDetailComponent,
    UserSettingComponent
  ],
  imports: [
    ShareModule,
    ClipboardModule,
    UserRouterModule,
  ]
})
export class UserModule {
}
