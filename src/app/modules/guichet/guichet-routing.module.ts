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
  { path: 'colisDetails/:id', loadChildren: () => import('./colis-details/colis-details.module').then(m => m.ColisDetailsModule) },
  { path: 'rapport', loadChildren: () => import('./rapport-agent/rapport-agent.module').then(m => m.RapportAgentModule) },
  { path: 'rapport-criteres', loadChildren: () => import('./rapport-criteres/rapport-criteres.module').then(m => m.RapportCriteresModule) },
  { path: 'livraison', loadChildren: () => import('./livraison/livraison.module').then(m => m.LivraisonModule) },
  { path: 'courrier-ordinaire/:id/:nom/:telephone', loadChildren: () => import('./courrier-ordinaire/courrier-ordinaire.module').then(m => m.CourrierOrdinaireModule) },
  { path: 'courrier-recommande/:id/:nom/:telephone', loadChildren: () => import('./courrier-recommande/courrier-recommande.module').then(m => m.CourrierRecommandeModule) },
  { path: 'courrier-valeur-declare/:id/:nom/:telephone', loadChildren: () => import('./courrier-valeur-declare/courrier-valeur-declare.module').then(m => m.CourrierValeurDeclareModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuichetRoutingModule { }
