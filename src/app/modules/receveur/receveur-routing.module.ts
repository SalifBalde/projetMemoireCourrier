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
  {path: 'tracking-ecommerce',  loadChildren: () => import('./tracking-ecommerce/tracking.module').then(m => m.TrackingModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceveurRoutingModule { }
