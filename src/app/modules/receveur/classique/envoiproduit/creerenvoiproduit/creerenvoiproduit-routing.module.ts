import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreerenvoiproduitComponent } from './creerenvoiproduit.component';

const routes: Routes = [{ path: '', component: CreerenvoiproduitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreerenvoiproduitRoutingModule { }
