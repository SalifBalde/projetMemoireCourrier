import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcomDetailsComponent } from './ecom-details.component';

const routes: Routes = [{ path: '', component: EcomDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcomDetailsRoutingModule { }
