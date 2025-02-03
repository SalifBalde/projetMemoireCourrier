import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MessagerieComponent} from "./messagerie.component";
import {CourrierImportrcepModule} from "../massagerie-packet/courrier-importrcep.module";

const routes: Routes = [{ path: '', component: MessagerieComponent },
    { path: 'reception', loadChildren: () => import('./reception/reception.module').then(m => m.ReceptionModule) },
    { path: 'expedition', loadChildren: () => import('./expedition/expedition.module').then(m => m.ExpeditionModule) },
    { path: 'rapport', loadChildren: () => import('./rapport/rapport.module').then(m => m.RapportModule) },
   { path: 'colis-import', loadChildren: () => import('./colis-import/colisImport.module').then(m => m.ColisImportModule) },
   { path: 'colis-import-exp', loadChildren: () => import('./colis-import-expedi/colisImportExp.module').then(m => m.ColisImportExpModule) },
   { path: 'sortieDouane', loadChildren: () => import('./sortie-douane/sortieDouane.module').then(m => m.SortieDouaneModule) },
    { path: 'courrier-details-ligneColi/courrierDetailMessagLignColiArriere/:id', loadChildren: () => import('./courrier-details-MessagerieLigneColi/courrier-details.module').then(m => m.CourrierDetailsMessagLigneColiModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagerieiRoutingModule { }
