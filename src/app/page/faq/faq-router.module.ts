import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FaqComponent} from './faq.component';
import {IndexGuardService} from '../../service/index.guard.service';

const routes: Routes = [
  {path: '', component: FaqComponent, canActivate: [IndexGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRouterModule {
}
