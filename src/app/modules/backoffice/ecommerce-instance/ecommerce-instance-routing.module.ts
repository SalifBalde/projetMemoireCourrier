import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcommerceInstanceComponent } from './ecommerce-instance.component';

const routes: Routes = [{ path: '', component: EcommerceInstanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceInstanceRoutingModule { }
