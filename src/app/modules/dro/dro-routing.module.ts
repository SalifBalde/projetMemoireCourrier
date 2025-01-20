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
      { path: '', redirectTo: 'dro', pathMatch: 'full' },
      { path: 'dro', component: IndexComponent },

    ],
  },
  { path: 'rapport-courrier', loadChildren: () => import('./rapport-courrier/rapport-criteres.module').then(m => m.RapportCriteresModule) },
  { path: 'courrier-details/:id', loadChildren: () => import('./courrier-details/courrier-details.module').then(m => m.CourrierDetailsModule) },
  { path: 'rapport-ecom', loadChildren: () => import('./rapport-ecom/rapport-ecom.module').then(m => m.RapportEcomModule) },
  { path: 'ecom-details/:id', loadChildren: () => import('./ecom-details/ecom-details.module').then(m => m.EcomDetailsModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DroRoutingModule { }
