import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceptionCourrierBureauComponent} from "./reception-courrier-bureau.component";

const routes: Routes = [{ path: '', component: ReceptionCourrierBureauComponent, }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionCourrierBureauRoutingModule { }
