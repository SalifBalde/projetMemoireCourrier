import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RapportCriteresComponent} from "./rapport-criteres.component";

const routes: Routes = [{path:'',component:RapportCriteresComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RapportCriteresRoutingModule { }
