import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceptionColisComponent} from "./reception-colis.component";

const routes: Routes = [{ path: '', component: ReceptionColisComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionColisArriereRoutingModule { }
