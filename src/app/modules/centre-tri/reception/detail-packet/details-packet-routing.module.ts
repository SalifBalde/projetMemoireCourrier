import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DetailPacketComponent} from "./detail-packet.component";

const routes: Routes = [{ path: '', component: DetailPacketComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsPacketRoutingModule { }
