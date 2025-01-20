import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceptionImportComponent} from "./reception-import.component";

const routes: Routes = [{ path: '', component: ReceptionImportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionImportRoutingModule { }
