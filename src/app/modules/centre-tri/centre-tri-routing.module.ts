import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentreTriComponent } from './centre-tri.component';

const routes: Routes = [{ path: '', component: CentreTriComponent },
    { path: 'reception', loadChildren: () => import('./reception/reception.module').then(m => m.ReceptionModule) },
    { path: 'linepacket', loadChildren: () => import('./reception/reception-line-packet/reception-line-packet.module').then(m => m.ReceptionLinePacketModule) },
    { path: 'linepacketDeclarer', loadChildren: () => import('./reception/line-packet-declarer/line-packet-declarer.module').then(m => m.LinePacketDeclarerModule) },
    { path: 'expedition', loadChildren: () => import('./expedition/expedition.module').then(m => m.ExpeditionModule) },
    { path: 'rapport', loadChildren: () => import('./rapport/rapport.module').then(m => m.RapportModule) },
    { path: 'courrier-import-exp', loadChildren: () => import('../massagerie-packet/courrier-import-expedi/courrierImportExp.module').then(m => m.CourrierImportExpModule) }
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentreTriRoutingModule { }
