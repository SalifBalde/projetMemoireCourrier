import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RapportEcomComponent } from './rapport-ecom.component';

const routes: Routes = [{path:'',component:RapportEcomComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RapportEcomRoutingModule { }
