import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceptionPacketImportComponent} from "./reception-packet-import.component";

const routes: Routes = [{ path: '', component: ReceptionPacketImportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionPacketImportRoutingModule { }
