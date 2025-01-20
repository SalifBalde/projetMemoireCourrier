import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceptionPacketComponent} from "./reception-packet.component";

const routes: Routes = [{ path: '', component: ReceptionPacketComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptioPnacketRoutingModule { }
