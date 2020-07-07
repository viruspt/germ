import {NgModule} from '@angular/core';
import {FaqRouterModule} from './faq-router.module';
import {FaqComponent} from './faq.component';
import {ShareModule} from '../../share/share.module';

@NgModule({
  declarations: [
    FaqComponent
  ],
  imports: [
    ShareModule,
    FaqRouterModule,
  ]
})
export class FaqModule {
}
