import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceptionColisBureauComponent} from "./reception-colis-bureau.component";

const routes: Routes = [{ path: '', component: ReceptionColisBureauComponent, }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionColisBureauRoutingModule { }
