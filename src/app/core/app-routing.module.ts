import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Page404Component} from '../share/page404/page404.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/auth'},
  {path: 'auth', loadChildren: () => import('../pages/auth/auth.module').then(m => m.AuthModule)},
  {path: 'index', loadChildren: () => import('../pages/index/index.module').then(m => m.IndexModule)},
  {path: 'faq', loadChildren: () => import('../pages/faq/faq.module').then(m => m.FaqModule)},
  {path: 'torrents', loadChildren: () => import('../pages/torrents/torrents.module').then(m => m.TorrentsModule)},
  {path: 'waiting', loadChildren: () => import('../pages/wait/wait.module').then(m => m.WaitModule)},
  {path: 'release', loadChildren: () => import('../pages/release/release.module').then(m => m.ReleaseModule)},
  {path: 'details', loadChildren: () => import('../pages/details/details.module').then(m => m.DetailsModule)},
  {path: 'user', loadChildren: () => import('../pages/user/user.module').then(m => m.UserModule)},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
