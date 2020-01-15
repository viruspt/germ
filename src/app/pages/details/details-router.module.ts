import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DetailsComponent} from './details.component';
import {IndexGuardService} from '../../service/index.guard.service';

const routes: Routes = [
  {path: '', component: DetailsComponent, canActivate: [IndexGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRouterModule {
}
