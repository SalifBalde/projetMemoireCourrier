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
  { path: 'rapport', loadChildren: () => import('./rapport-agent/rapport-agent.module').then(m => m.RapportAgentModule) },
  { path: 'rapport-criteres', loadChildren: () => import('./rapport-criteres/rapport-criteres.module').then(m => m.RapportCriteresModule) },
  { path: 'courrier-details/:id', loadChildren: () => import('./courrier-details/courrier-details.module').then(m => m.CourrierDetailsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DroRoutingModule { }
