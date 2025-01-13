import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArriereComponent } from './arriere.component';

const routes: Routes = [{ path: '', component: ArriereComponent },
   { path: 'reception', loadChildren: () => import('./reception/reception.module').then(m => m.ReceptionModule) },
   { path: 'reception/receptionColis', loadChildren: () => import('./reception/reception-colis/reception-colis.module').then(m => m.ReceptionColisModule) },
   { path: 'reception/reception-E-commerce', loadChildren: () => import('./reception/reception-E-commerce/reception-E-commerce.module').then(m => m.ReceptionECommerceModule) },
//    { path: 'expedition', loadChildren: () => import('./expedition/expedition.module').then(m => m.ExpeditionModule) },
//    { path: 'expedition/expeditionColis', loadChildren: () => import('./expedition/expedition-colis/expeditionColis.module').then(m => m.ExpeditionColisModule) },
   { path: 'expedition/expedition-E-commerce', loadChildren: () => import('./expedition/expedition-E-commerce/expedition-E-commerce.module').then(m => m.ExpeditionECommerceModule) },
   { path: 'rapport', loadChildren: () => import('../drp/rapport/rapport.module').then(m => m.RapportModule) },
//    { path: 'details-expedition/:id', loadChildren: () => import('./details-expedition/details-expedition.module').then(m => m.DetailsExpeditionModule) },
   { path: 'details-expeditionEcom/:id', loadChildren: () => import('./detail-expeditionEcom/detail-expeditionEcom.module').then(m => m.DetailExpeditionEcomModule) },
   { path: 'RapportEcommerce', loadChildren: () => import('./rapportEcommerce/rapportEcommerce.module').then(m => m.RapportEcommerceModule) },


  ];

@NgModule({
  imports: [RouterModule.forChild(routes
      )],
  exports: [RouterModule]
})
export class ArriereRoutingModule { }
