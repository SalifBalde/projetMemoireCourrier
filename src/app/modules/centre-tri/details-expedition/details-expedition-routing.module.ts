import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsExpeditionComponent } from './details-expedition.component';

const routes: Routes = [{ path: '', component: DetailsExpeditionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsExpeditionRoutingModule { }
