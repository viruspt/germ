import {NgModule} from '@angular/core';
import {DetailsRouterModule} from './details-router.module';
import {DetailsComponent} from './details.component';
import {MarkdownModule} from 'ngx-markdown';
import {ShareModule} from '../../share/share.module';

@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    ShareModule,
    DetailsRouterModule,
    MarkdownModule
  ]
})
export class DetailsModule {
}
