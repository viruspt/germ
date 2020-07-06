import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PostListComponent} from './list/list.component';
import {IndexGuardService} from '../../service/index.guard.service';
import {PostDetailComponent} from './detail/detail.component';
import {PostReleaseComponent} from './release/release.component';
import {PostWaitComponent} from './wait/wait.component';
import {UnsavedGuard} from '../../service/unsaved.guard.service';

const routes: Routes = [
  {path: '', component: PostListComponent, canActivate: [IndexGuardService]},
  {path: 'list', component: PostListComponent, canActivate: [IndexGuardService]},
  {path: 'detail', component: PostDetailComponent, canActivate: [IndexGuardService]},
  {path: 'release', component: PostReleaseComponent, canActivate: [IndexGuardService], canDeactivate: [UnsavedGuard]},
  // {path: 'wait', component: PostWaitComponent, canActivate: [IndexGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRouterModule {
}
