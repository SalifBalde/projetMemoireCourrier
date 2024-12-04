import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeProduitComponent } from './type-produit.component';

const routes: Routes = [{ path: '', component: TypeProduitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeProduitRoutingModule { }
