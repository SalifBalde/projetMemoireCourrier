import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoidsCourrierComponent } from './poids-courrier.component';

const routes: Routes = [{ path: '', component: PoidsCourrierComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoidsCourrierRoutingModule { }
