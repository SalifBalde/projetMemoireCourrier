import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitComponent } from './produit/produit.component';

const routes: Routes = [
    {
        path: '', 
        children: [
            { path : 'backoffice', redirectTo : 'index', pathMatch: 'full'},
            { path : 'index', component: ProduitComponent, title : ''},
          ]
    },
    { path: 'produits', loadChildren: () => import('./produit/produit.module').then(m => m.ProduitModule) },
<<<<<<< HEAD
    { path: 'poids', loadChildren: () => import('./poids/poids.module').then(m => m.PoidsModule) },
    { path: 'distances', loadChildren: () => import('./distance/distance.module').then(m => m.DistanceModule) },
    { path: 'tarifpoids', loadChildren: () => import('./tarif-poids/tarif-poids.module').then(m => m.TarifPoidsModule) },
    { path: 'typeVehicule', loadChildren: () => import('./type-vehicule/type-vehicule.module').then(m => m.TypeVehiculeModule) },
    { path: 'distancebureau', loadChildren: () => import('./distance-bureau/distance-bureau.module').then(m => m.DistanceBureauModule) },
=======
    { path: 'type-produit', loadChildren: () => import('./type-produit/type-produit.module').then(m => m.TypeProduitModule) },
    { path: 'themes', loadChildren: () => import('./theme/theme.module').then(m => m.ThemeModule) },
    { path: 'partenaires', loadChildren: () => import('./partenaire/partenaire.module').then(m => m.PartenaireModule) },
    { path: 'zones', loadChildren: () => import('./zone/zone.module').then(m => m.ZoneModule) },
    { path: 'typeCourriers', loadChildren: () => import('./type-courrier/type-courrier.module').then(m => m.TypeCourrierModule) },
    { path: 'typeCategories', loadChildren: () => import('./type-categorie/type-categorie.module').then(m => m.TypeCategorieModule) },
    { path: 'regimes', loadChildren: () => import('./regime/regime.module').then(m => m.RegimeModule) },
    { path: 'poidsCourriers', loadChildren: () => import('./poids-courrier/poids-courrier.module').then(m => m.PoidsCourrierModule) },
    { path: 'serviceCourriers', loadChildren: () => import('./service-courrier/service-courrier.module').then(m => m.ServiceCourrierModule) },
>>>>>>> Seny
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
