import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourrierImportRcepComponent} from "./courrier-import-rcep.component";
import {SortieDouanePacketModule} from "./sortie-douane-packet/sortieDouane.module";

const routes: Routes = [{ path: '', component: CourrierImportRcepComponent },
    { path: 'reception-packet-import', loadChildren: () => import('../massagerie-packet/courrier-importrcep.module').then(m => m.CourrierImportrcepModule) },
    { path: 'packet-exp', loadChildren: () => import('./courrier-import-expedi/courrierImportExp.module').then(m => m.CourrierImportExpModule) },
    { path: 'sortieDouane', loadChildren: () => import('../massagerie-packet/sortie-douane-packet/sortieDouane.module').then(m => m.SortieDouanePacketModule) },
    { path: 'RapportMassageriePacket', loadChildren: () => import('./rapport-massageiriePacket/rapport.module').then(m => m.RapportArriereMassageriePacketModule) },
    { path: 'courrier-details-packet/courrierDetailMessagPacketArriere/:id', loadChildren: () => import('../massagerie-packet/courrier-details-MessageriePacket/courrier-details.module').then(m => m.CourrierDetailsMessagPacketModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourrierImportRcepRoutingModule { }
