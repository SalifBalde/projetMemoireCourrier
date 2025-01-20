import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpeditionPacketComponent} from "./expedition-packet.component";

const routes: Routes = [{ path: '', component: ExpeditionPacketComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpeditionPacketRoutingModule { }
