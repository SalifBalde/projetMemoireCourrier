import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourrierRecommandeComponent } from './courrier-recommande.component';

const routes: Routes = [{ path: '', component: CourrierRecommandeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourrierRecommandeRoutingModule { }
