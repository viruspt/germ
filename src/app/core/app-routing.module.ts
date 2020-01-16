import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Page404Component} from '../share/page404/page404.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/auth'},
  {path: 'auth', loadChildren: () => import('../pages/auth/auth.module').then(m => m.AuthModule)},
  {path: 'index', loadChildren: () => import('../pages/index/index.module').then(m => m.IndexModule)},
  {path: 'faq', loadChildren: () => import('../pages/faq/faq.module').then(m => m.FaqModule)},
  {path: 'torrent', loadChildren: () => import('../pages/torrent/torrent.module').then(m => m.TorrentModule)},
  {path: 'user', loadChildren: () => import('../pages/user/user.module').then(m => m.UserModule)},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
