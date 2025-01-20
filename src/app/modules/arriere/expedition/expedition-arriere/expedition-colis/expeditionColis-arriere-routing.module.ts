import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpeditionLettreComponent} from "./expedition-lettre.component";

const routes: Routes = [{ path: '', component: ExpeditionLettreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpeditionColisArriereRoutingModule { }
