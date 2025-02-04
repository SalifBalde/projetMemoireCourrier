import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceptionLinePacketComponent} from "./reception-line-packet.component";

const routes: Routes = [{ path: '', component: ReceptionLinePacketComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionCourrierArrierRoutingModule { }
