import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentreTriComponent } from './centre-tri.component';

const routes: Routes = [{ path: '', component: CentreTriComponent },
    { path: 'reception', loadChildren: () => import('./reception/reception.module').then(m => m.ReceptionModule) },
    { path: 'linepacket', loadChildren: () => import('./reception/reception-line-packet/reception-line-packet.module').then(m => m.ReceptionLinePacketModule) },
    { path: 'linepacketDeclarer', loadChildren: () => import('./reception/line-packet-declarer/line-packet-declarer.module').then(m => m.LinePacketDeclarerModule) },
    // { path: 'expedition', loadChildren: () => import('./expedition/expedition.module').then(m => m.ExpeditionModule) },
    // { path: 'expedition', loadChildren: () => import('./expedition/expedition.module').then(m => m.ExpeditionModule) },
    { path: 'rapport', loadChildren: () => import('./rapport/rapport.module').then(m => m.RapportModule) },
    { path: 'courrier-import-exp', loadChildren: () => import('../massagerie-packet/courrier-import-expedi/courrierImportExp.module').then(m => m.CourrierImportExpModule) },
    { path: 'details-expedition/:id', loadChildren: () => import('./details-expedition/details-expedition.module').then(m => m.DetailsExpeditionModule) },
    { path: 'expedition/expedition-E-commerce', loadChildren: () => import('./expedition-E-commerce/expedition-E-commerce.module').then(m => m.ExpeditionECommerceModule) },
    { path: 'reception/reception-E-commerce', loadChildren: () => import('./reception-E-commerce/reception-E-commerce.module').then(m => m.ReceptionECommerceModule) },
    { path: 'details-expeditionEcom/:id', loadChildren: () => import('./detail-expeditionEcom/detail-expeditionEcom.module').then(m => m.DetailExpeditionEcomModule) },
    { path: 'RapportEcommerce', loadChildren: () => import('./rapportEcommerce/rapportEcommerce.module').then(m => m.RapportEcommerceModule) },
    {path: 'suiviCourrier',  loadChildren: () => import('./suiviCourrier/suiviCourrier.module').then(m => m.SuiviCourrierModule) },
    { path: 'courrier-details-packet/courrierDetailPacketArriere/:id', loadChildren: () => import('./reception/courrier-details-packet/courrier-details.module').then(m => m.CourrierDetailsLingePacketModule) },
    { path: 'traking', loadChildren: () => import('./traking/traking.module').then(m => m.TrakingModule) },
    { path: 'details-packet/:id', loadChildren: () => import('./reception/detail-packet/details-packet.module').then(m => m.DetailsPacketModule) },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentreTriRoutingModule { }
