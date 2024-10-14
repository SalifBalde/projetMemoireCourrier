import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreerColisProduitComponent } from './creer-colis-produit.component';

const routes: Routes = [{ path: '', component: CreerColisProduitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreerColisProduitRoutingModule { }
