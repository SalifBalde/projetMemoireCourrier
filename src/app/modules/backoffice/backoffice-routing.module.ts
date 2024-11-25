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
    { path: 'type-produit', loadChildren: () => import('./type-produit/type-produit.module').then(m => m.TypeProduitModule) },
    { path: 'themes', loadChildren: () => import('./theme/theme.module').then(m => m.ThemeModule) },
    { path: 'partenaires', loadChildren: () => import('./partenaire/partenaire.module').then(m => m.PartenaireModule) },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
