import {NgModule} from '@angular/core';
import {PostRouterModule} from './post-router.module';
import {PostListComponent} from './list/list.component';
import {ShareModule} from '../../share/share.module';
import {PostDetailComponent} from './detail/detail.component';
import {PostReleaseComponent} from './release/release.component';
import {PostWaitComponent} from './wait/wait.component';

@NgModule({
  declarations: [
    PostListComponent,
    PostDetailComponent,
    PostReleaseComponent,
    PostWaitComponent
  ],
  imports: [
    ShareModule,
    PostRouterModule
  ]
})
export class PostModule {
}
