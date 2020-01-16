import {NgModule} from '@angular/core';
import {FaqRouterModule} from './faq-router.module';
import {FaqComponent} from './faq.component';
import {MarkdownModule} from 'ngx-markdown';
import {ShareModule} from '../../share/share.module';

@NgModule({
  declarations: [
    FaqComponent
  ],
  imports: [
    ShareModule,
    FaqRouterModule,
    MarkdownModule
  ]
})
export class FaqModule {
}
