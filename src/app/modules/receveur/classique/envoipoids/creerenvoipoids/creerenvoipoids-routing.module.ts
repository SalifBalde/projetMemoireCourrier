import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreerenvoiPoidsComponent } from './creerenvoipoids.component';

const routes: Routes = [{ path: '', component: CreerenvoiPoidsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreerenvoieRoutingModule { }
