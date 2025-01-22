import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpeditionECommerceComponent } from './expedition-E-commerce.component';

const routes: Routes = [{ path: '', component: ExpeditionECommerceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpeditionECommerceRoutingModule { }
