import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes} from '@angular/router';

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
      { path: '', redirectTo: 'receveur', pathMatch: 'full' },
      { path: 'receveur', component: IndexComponent },

    ],
  },
  { path: 'Creerclientpoids', loadChildren: () => import('./classique/envoipoids/creerclientpoids/creerclientpoids.module').then(m => m.CreerclientModule) },
  { path: 'searchclient', loadChildren: () => import('./classique/envoipoids/searchclient/searchclient.module').then(m => m.SearchclientModule) },
  { path: 'Creerenvoipoids', loadChildren: () => import('./classique/envoipoids/creerenvoipoids/creerenvoipoids.module').then(m => m.CreerenvoiPoidsModule) },
  { path: 'Creerenvoiproduit', loadChildren: () => import('./classique/envoiproduit/creerenvoiproduit/creerenvoiproduit.module').then(m => m.CreerenvoiproduitModule) },
  { path: 'Creerclientproduit', loadChildren: () => import('./classique/envoiproduit/creerclientproduit/creerclientproduit.module').then(m => m.CreerclientProduitModule) },
  { path: 'Searchclientproduit', loadChildren: () => import('./classique/envoiproduit/searchclientproduit/searchclientproduit.module').then(m => m.SearchclientproduitModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceveurRoutingModule { }
