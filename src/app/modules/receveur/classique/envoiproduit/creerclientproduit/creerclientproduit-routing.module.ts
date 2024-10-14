import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreerClientProduitComponent } from './creerclientproduit.component';

const routes: Routes = [{ path: '', component: CreerClientProduitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreerclientRoutingModule { }
