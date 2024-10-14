import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreerClientComponent } from './creerclientpoids.component';

const routes: Routes = [{ path: '', component: CreerClientComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreerclientRoutingModule { }
