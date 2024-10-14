import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistanceComponent } from './distance.component';

const routes: Routes = [{ path: '', component: DistanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistanceRoutingModule { }
