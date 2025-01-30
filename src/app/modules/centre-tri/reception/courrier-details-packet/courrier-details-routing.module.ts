import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourrierDetailsComponent } from './courrier-details.component';

const routes: Routes = [{ path: '', component: CourrierDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourrierDetailsArriererLinePacketRoutingModule { }
