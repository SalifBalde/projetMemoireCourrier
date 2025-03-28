import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AcheminementComponent} from "./acheminement.component";

const routes: Routes = [{ path: '', component: AcheminementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcheminementRoutingModule { }
