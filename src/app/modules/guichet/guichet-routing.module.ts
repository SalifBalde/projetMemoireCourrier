import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    component: IndexComponent,
    children: [
      { path: '', redirectTo: 'guichet', pathMatch: 'full' },
      { path: 'guichet', component: IndexComponent },

    ],
  },
  { path: 'search-client/:id', loadChildren: () => import('./search-client/search-client.module').then(m => m.SearchClientModule) },
  { path: 'creerColisPoids/:id/:nom/:telephone', loadChildren: () => import('./creer-colis-poids/creer-colis-poids.module').then(m => m.CreerColisPoidsModule) },
  { path: 'colisDetails/:id', loadChildren: () => import('./colis-details/colis-details.module').then(m => m.ColisDetailsModule) },
  { path: 'creerColisProduit/:id/:nom/:telephone', loadChildren: () => import('./creer-colis-produit/creer-colis-produit.module').then(m => m.CreerColisProduitModule) },
  { path: 'rapport', loadChildren: () => import('./rapport-agent/rapport-agent.module').then(m => m.RapportAgentModule) },
  { path: 'rapport-criteres', loadChildren: () => import('./rapport-criteres/rapport-criteres.module').then(m => m.RapportCriteresModule) },
  { path: 'versement', loadChildren: () => import('./versement/versement.module').then(m => m.VersementModule) },
  { path: 'livraison', loadChildren: () => import('./livraison/livraison.module').then(m => m.LivraisonModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuichetRoutingModule { }
