import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourrierOrdinaireComponent } from './courrier-ordinaire.component';

const routes: Routes = [{ path: '', component: CourrierOrdinaireComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourrierOrdinaireRoutingModule { }
