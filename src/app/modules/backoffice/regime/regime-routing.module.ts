import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegimeComponent } from './regime.component';

const routes: Routes = [{ path: '', component: RegimeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegimeRoutingModule { }
