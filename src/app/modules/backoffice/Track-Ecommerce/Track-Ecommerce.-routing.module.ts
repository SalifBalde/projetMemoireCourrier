import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackEcommerceComponent } from './Track-Ecommerce.component';

const routes: Routes = [{ path: '', component: TrackEcommerceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackEcommerceRoutingModule { }
