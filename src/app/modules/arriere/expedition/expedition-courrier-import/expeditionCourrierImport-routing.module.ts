import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpeditionCourrierImportComponent} from "./expedition-courrier-import.component";

const routes: Routes = [{ path: '', component: ExpeditionCourrierImportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpeditionCourrierImportRoutingModule { }
