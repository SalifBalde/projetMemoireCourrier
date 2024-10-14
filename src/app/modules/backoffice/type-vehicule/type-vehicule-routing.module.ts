import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeVehiculeComponent } from './type-vehicule.component';

const routes: Routes = [{ path: '', component: TypeVehiculeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeVehiculeRoutingModule { }
