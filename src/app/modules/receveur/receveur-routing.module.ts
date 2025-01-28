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
  {path: 'suiviCourrier',  loadChildren: () => import('./suiviCourrier/suiviCourrier.module').then(m => m.SuiviCourrierModule) },
  { path: 'rapport-courrier', loadChildren: () => import('./rapport-courrier/rapport-criteres.module').then(m => m.RapportCriteresModule) },
  { path: 'rapport-ecom', loadChildren: () => import('./rapport-ecom/rapport-ecom.module').then(m => m.RapportEcomModule) },
  { path: 'ecom-details/:id', loadChildren: () => import('./ecom-details/ecom-details.module').then(m => m.EcomDetailsModule) },
  { path: 'courrier-details/:id', loadChildren: () => import('./courrier-details/courrier-details.module').then(m => m.CourrierDetailsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceveurRoutingModule { }
