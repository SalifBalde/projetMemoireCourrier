import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import {DashboardComponent} from "../../demo/components/dashboard/dashboard.component";
import {CourrierDetailsrapportModule} from "./rapport-fermeture/courrier-details-rapport/courrier-details.module";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'dcl', pathMatch: 'full' },
      { path: 'dcl', component: DashboardComponent },


    ],
  },

  { path: 'rapport', loadChildren: () => import('./rapport/rapport.module').then(m => m.RapportModule) },
  { path: 'rapport-courrier', loadChildren: () => import('./rapport-courrier/rapport-criteres.module').then(m => m.RapportCriteresModule) },
    { path: 'traking', loadChildren: () => import('../arriere/traking/traking.module').then(m => m.TrakingModule) },
    { path: 'courrier-details-rapportt/courrierDetailArriere/:id', loadChildren: () => import('./rapport-fermeture/courrier-details-rapport/courrier-details.module').then(m => m.CourrierDetailsrapportModule) },
    { path: 'rapports', loadChildren: () => import('./rapport-fermeture/rapport.module').then(m => m.RapportArriereModule) },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DclRoutingModule { }
