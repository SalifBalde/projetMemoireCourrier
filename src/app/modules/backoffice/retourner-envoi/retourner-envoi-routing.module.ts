import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetournerEnvoiComponent } from './retourner-envoi.component';

const routes: Routes = [{ path: '', component: RetournerEnvoiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetournerEnvoiRoutingModule { }
