import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitComponent } from './produit/produit.component';
import { PoidsComponent } from './poids/poids.component';

const routes: Routes = [
    {
        path: '', component: PoidsComponent,
        children: [
            { path : 'backoffice', redirectTo : 'index', pathMatch: 'full'},
            { path : 'index', component: ProduitComponent, title : ''},
          ]
    },
    { path: 'produits', loadChildren: () => import('./produit/produit.module').then(m => m.ProduitModule) },
    { path: 'poids', loadChildren: () => import('./poids/poids.module').then(m => m.PoidsModule) },
    { path: 'distances', loadChildren: () => import('./distance/distance.module').then(m => m.DistanceModule) },
    { path: 'tarifpoids', loadChildren: () => import('./tarif-poids/tarif-poids.module').then(m => m.TarifPoidsModule) },
    { path: 'typeVehicule', loadChildren: () => import('./type-vehicule/type-vehicule.module').then(m => m.TypeVehiculeModule) },
    { path: 'distancebureau', loadChildren: () => import('./distance-bureau/distance-bureau.module').then(m => m.DistanceBureauModule) },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
