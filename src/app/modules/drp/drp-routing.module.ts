import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrpComponent } from './drp.component';
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
      { path: '', redirectTo: 'drp', pathMatch: 'full' },
      { path: 'drp', component: IndexComponent },


    ],
  },

  { path: 'rapport', loadChildren: () => import('./rapport/rapport.module').then(m => m.RapportModule) },
  { path: 'rapport-ecommerce', loadChildren: () => import('./rapportEcommerce/rapportEcommerce.module').then(m => m.RapportEcommerceModule) },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrpRoutingModule { }
