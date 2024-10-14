import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VersementComponent } from './versement.component';

const routes: Routes = [{ path: '', component: VersementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VersementRoutingModule { }
