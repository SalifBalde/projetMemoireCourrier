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
    { path: 'payss', loadChildren: () => import('../backoffice/pays/pays.module').then(m => m.PaysModule) },
    { path: 'zones', loadChildren: () => import('../backoffice/zone/zone.module').then(m => m.ZoneModule) },
    { path: 'poidsCourriers', loadChildren: () => import('../backoffice/poids-courrier/poids-courrier.module').then(m => m.PoidsCourrierModule) },
    { path: 'categories', loadChildren: () => import('../backoffice/categories/categories.module').then(m => m.CategoriesModule) },
    { path: 'acheminement', loadChildren: () => import('../backoffice/acheminement/acheminement.module').then(m => m.AcheminementModule) },
    { path: 'serviceCourriers', loadChildren: () => import('../backoffice/service-courrier/service-courrier.module').then(m => m.ServiceCourrierModule) },
    { path: 'typeCategories', loadChildren: () => import('../backoffice/type-categorie/type-categorie.module').then(m => m.TypeCategorieModule) },
    { path: 'typeCourriers', loadChildren: () => import('../backoffice/type-courrier/type-courrier.module').then(m => m.TypeCourrierModule) },
    { path: 'regimes', loadChildren: () => import('../backoffice/regime/regime.module').then(m => m.RegimeModule) },










]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DclRoutingModule { }
