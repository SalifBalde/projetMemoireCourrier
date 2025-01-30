import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourrierImportRcepComponent} from "./courrier-import-rcep.component";

const routes: Routes = [{ path: '', component: CourrierImportRcepComponent },
    { path: 'reception-packet-import', loadChildren: () => import('../massagerie-packet/courrier-importrcep.module').then(m => m.CourrierImportrcepModule) },
    { path: 'packet-exp', loadChildren: () => import('./courrier-import-expedi/courrierImportExp.module').then(m => m.CourrierImportExpModule) },
    { path: 'RapportMassageriePacket', loadChildren: () => import('./rapport-massageiriePacket/rapport.module').then(m => m.RapportArriereMassageriePacketModule) }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourrierImportRcepRoutingModule { }
