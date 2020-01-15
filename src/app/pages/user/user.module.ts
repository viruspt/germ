import {NgModule} from '@angular/core';
import {ShareModule} from '../../share/share.module';
import {DetailsComponent} from './details/details.component';
import {UserRouterModule} from './user-router.module';

@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    ShareModule,
    UserRouterModule,
  ]
})
export class UserModule {
}
