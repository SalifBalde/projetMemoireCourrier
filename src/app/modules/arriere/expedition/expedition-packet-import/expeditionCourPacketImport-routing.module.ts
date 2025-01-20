import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpeditionPacketImportComponent} from "./expedition-packet-import.component";

const routes: Routes = [{ path: '', component: ExpeditionPacketImportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpeditionCourrierPacketImportRoutingModule { }
