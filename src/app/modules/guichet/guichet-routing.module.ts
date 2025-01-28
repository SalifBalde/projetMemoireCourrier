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
  { path: 'colisDetails/:id', loadChildren: () => import('./colis-details/colis-details.module').then(m => m.ColisDetailsModule) },
  { path: 'rapport', loadChildren: () => import('./rapport-agent/rapport-agent.module').then(m => m.RapportAgentModule) },
  { path: 'livraison', loadChildren: () => import('./livraison/livraison.module').then(m => m.LivraisonModule) },
  { path: 'courrier-ordinaire', loadChildren: () => import('./courrier-ordinaire/courrier-ordinaire.module').then(m => m.CourrierOrdinaireModule) },
  { path: 'courrier-details/:id', loadChildren: () => import('./courrier-details/courrier-details.module').then(m => m.CourrierDetailsModule) },
  { path: 'colis', loadChildren: () => import('./colis/colis.module').then(m => m.ColisModule) },
  { path: 'livraison-ecom', loadChildren: () => import('./livraison-ecom/livraison-ecom.module').then(m => m.LivraisonEcomModule) },
  { path: 'livraisonDetails/:id', loadChildren: () => import('./livraison-ecom-details/livraison-details.module').then(m => m.LivraisonDetailsModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuichetRoutingModule { }
