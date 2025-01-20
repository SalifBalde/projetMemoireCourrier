import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpeditionArriereComponent} from "./expedition-arriere.component";

const routes: Routes = [{ path: '', component: ExpeditionArriereComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpeditionArriereRoutingModule { }
