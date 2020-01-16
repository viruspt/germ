import {NgModule} from '@angular/core';

import {IndexRoutingModule} from './index-routing.module';

import {IndexComponent} from './index.component';
import {ShareModule} from '../../share/share.module';


@NgModule({
  imports: [
    ShareModule,
    IndexRoutingModule,
  ],
  declarations: [
    IndexComponent,
  ],
  exports: [IndexComponent]
})
export class IndexModule {
}
