import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistanceBureauComponent } from './distance-bureau.component';

const routes: Routes = [{ path: '', component: DistanceBureauComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistanceBureauRoutingModule { }
