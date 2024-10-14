import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarifPoidsComponent } from './tarif-poids.component';

const routes: Routes = [{ path: '', component: TarifPoidsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarifPoidsRoutingModule { }
