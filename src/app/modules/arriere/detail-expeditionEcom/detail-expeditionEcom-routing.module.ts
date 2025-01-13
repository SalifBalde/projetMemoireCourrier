import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailExpeditionEcomComponent } from './detail-expeditionEcom.component';

const routes: Routes = [{ path: '', component: DetailExpeditionEcomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailExpeditionEcomRoutingModule { }
