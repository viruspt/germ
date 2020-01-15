import {NgModule} from '@angular/core';
import {ShareModule} from '../../share/share.module';
import {DetailsComponent} from './details/details.component';
import {UserRouterModule} from './user-router.module';
import {ClipboardModule} from 'ngx-clipboard';

@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    ShareModule,
    ClipboardModule,
    UserRouterModule,
  ]
})
export class UserModule {
}
