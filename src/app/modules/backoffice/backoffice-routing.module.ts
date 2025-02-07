import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitComponent } from './produit/produit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'backoffice', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: ProduitComponent, title: '' },
    ]
  },
  { path: 'produits', loadChildren: () => import('./produit/produit.module').then(m => m.ProduitModule) },
  { path: 'type-produit', loadChildren: () => import('./type-produit/type-produit.module').then(m => m.TypeProduitModule) },
  { path: 'themes', loadChildren: () => import('./theme/theme.module').then(m => m.ThemeModule) },
  { path: 'partenaires', loadChildren: () => import('./partenaire/partenaire.module').then(m => m.PartenaireModule) },
  { path: 'zones', loadChildren: () => import('./zone/zone.module').then(m => m.ZoneModule) },
  { path: 'typeCourriers', loadChildren: () => import('./type-courrier/type-courrier.module').then(m => m.TypeCourrierModule) },
  { path: 'typeCategories', loadChildren: () => import('./type-categorie/type-categorie.module').then(m => m.TypeCategorieModule) },
  { path: 'regimes', loadChildren: () => import('./regime/regime.module').then(m => m.RegimeModule) },
  { path: 'poidsCourriers', loadChildren: () => import('./poids-courrier/poids-courrier.module').then(m => m.PoidsCourrierModule) },
  { path: 'serviceCourriers', loadChildren: () => import('./service-courrier/service-courrier.module').then(m => m.ServiceCourrierModule) },
  { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'pays', loadChildren: () => import('./pays/pays.module').then(m => m.PaysModule) },



];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
