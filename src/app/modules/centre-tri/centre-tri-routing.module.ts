import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentreTriComponent } from './centre-tri.component';

const routes: Routes = [{ path: '', component: CentreTriComponent },
    { path: 'reception', loadChildren: () => import('./reception/reception.module').then(m => m.ReceptionModule) },
    // { path: 'expedition', loadChildren: () => import('./expedition/expedition.module').then(m => m.ExpeditionModule) },
    { path: 'rapport', loadChildren: () => import('./rapport/rapport.module').then(m => m.RapportModule) },
    { path: 'details-expedition/:id', loadChildren: () => import('./details-expedition/details-expedition.module').then(m => m.DetailsExpeditionModule) },
    { path: 'expedition/expedition-E-commerce', loadChildren: () => import('./expedition-E-commerce/expedition-E-commerce.module').then(m => m.ExpeditionECommerceModule) },
    { path: 'reception/reception-E-commerce', loadChildren: () => import('./reception-E-commerce/reception-E-commerce.module').then(m => m.ReceptionECommerceModule) },
    { path: 'details-expeditionEcom/:id', loadChildren: () => import('./detail-expeditionEcom/detail-expeditionEcom.module').then(m => m.DetailExpeditionEcomModule) },
    { path: 'RapportEcommerce', loadChildren: () => import('./rapportEcommerce/rapportEcommerce.module').then(m => m.RapportEcommerceModule) },

    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentreTriRoutingModule { }
