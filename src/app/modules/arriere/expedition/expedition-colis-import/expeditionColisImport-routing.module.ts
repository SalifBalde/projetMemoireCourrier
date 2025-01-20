import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpeditionColisImportComponent} from "./expedition-colis-import.component";

const routes: Routes = [{ path: '', component: ExpeditionColisImportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpeditionColisImportRoutingModule { }
