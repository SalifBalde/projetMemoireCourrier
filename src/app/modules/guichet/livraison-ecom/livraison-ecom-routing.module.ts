import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivraisonEcomComponent } from './livraison-ecom.component';

const routes: Routes = [{ path: '', component: LivraisonEcomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivraisonEcomRoutingModule { }
