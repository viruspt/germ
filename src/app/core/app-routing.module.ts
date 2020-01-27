import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Page404Component} from '../share/page404/page404.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/auth'},
  {path: 'auth', loadChildren: () => import('../page/auth/auth.module').then(m => m.AuthModule)},
  {path: 'index', loadChildren: () => import('../page/index/index.module').then(m => m.IndexModule)},
  {path: 'faq', loadChildren: () => import('../page/faq/faq.module').then(m => m.FaqModule)},
  {path: 'post', loadChildren: () => import('../page/post/post.module').then(m => m.PostModule)},
  {path: 'user', loadChildren: () => import('../page/user/user.module').then(m => m.UserModule)},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
