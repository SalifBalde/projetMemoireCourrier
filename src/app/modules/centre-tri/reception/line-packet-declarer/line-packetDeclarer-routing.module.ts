import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LinePacketDeclarerComponent} from "./line-packet-declarer.component";

const routes: Routes = [{ path: '', component: LinePacketDeclarerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinePacketDeclarerRoutingModule { }
