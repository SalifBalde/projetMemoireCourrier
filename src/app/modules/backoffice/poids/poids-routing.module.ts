import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoidsComponent } from './poids.component';

const routes: Routes = [{ path: '', component: PoidsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoidsRoutingModule { }
