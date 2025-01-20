import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceptionPacketBureauLivComponent} from "./reception-packet-bureau-liv.component";

const routes: Routes = [{ path: '', component: ReceptionPacketBureauLivComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionPacketRoutingModule { }
