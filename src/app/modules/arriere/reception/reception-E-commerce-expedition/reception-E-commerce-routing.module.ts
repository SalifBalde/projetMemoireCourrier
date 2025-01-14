import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionECommerceComponent } from './reception-E-commerce.component';

const routes: Routes = [{ path: '', component: ReceptionECommerceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionECommerceRoutingModule { }
