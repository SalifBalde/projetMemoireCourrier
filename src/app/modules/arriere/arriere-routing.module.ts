import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArriereComponent } from './arriere.component';

const routes: Routes = [{ path: '', component: ArriereComponent },
   { path: 'reception', loadChildren: () => import('./reception/reception.module').then(m => m.ReceptionModule) },
   { path: 'expedition', loadChildren: () => import('./expedition/expedition.module').then(m => m.ExpeditionModule) },
<<<<<<< HEAD
   { path: 'rapport', loadChildren: () => import('../drp/rapport/rapport.module').then(m => m.RapportModule) },
=======
//{ path: 'rapport', loadChildren: () => import('./rapport.rapport.module').then(m => m.RapportModule) },
>>>>>>> c6d2fab96c95efd31722c9165163842cc1da5554
   { path: 'details-expedition/:id', loadChildren: () => import('./details-expedition/details-expedition.module').then(m => m.DetailsExpeditionModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes
      )],
  exports: [RouterModule]
})
export class ArriereRoutingModule { }
