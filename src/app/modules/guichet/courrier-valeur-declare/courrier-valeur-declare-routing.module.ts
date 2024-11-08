import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourrierValeurDeclareComponent } from './courrier-valeur-declare.component';

const routes: Routes = [{ path: '', component: CourrierValeurDeclareComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourrierValeurDeclareRoutingModule { }
