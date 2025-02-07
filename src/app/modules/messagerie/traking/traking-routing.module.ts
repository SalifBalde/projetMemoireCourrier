import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TrakingComponent} from "./traking.component";

const routes: Routes = [{ path: '', component: TrakingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrakingRoutingModule { }
