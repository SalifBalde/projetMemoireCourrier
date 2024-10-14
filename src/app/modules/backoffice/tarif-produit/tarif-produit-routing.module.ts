import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarifProduitComponent } from './tarif-produit.component';

const routes: Routes = [{ path: '', component: TarifProduitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarifProduitRoutingModule { }
