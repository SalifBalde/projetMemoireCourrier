import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchclientProduitComponent } from './searchclientproduit.component';

const routes: Routes = [{ path: '', component: SearchclientProduitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchclientproduitRoutingModule { }
