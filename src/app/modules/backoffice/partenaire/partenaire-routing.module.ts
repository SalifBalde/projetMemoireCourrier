import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartenaireComponent } from './partenaire.component';

const routes: Routes = [{ path: '', component: PartenaireComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartenaireRoutingModule { }
