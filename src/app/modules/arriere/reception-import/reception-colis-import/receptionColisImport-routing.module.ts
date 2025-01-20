import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceptionColisImportComponent} from "./reception-colis-import.component";

const routes: Routes = [{ path: '', component: ReceptionColisImportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionColisImportRoutingModule { }
