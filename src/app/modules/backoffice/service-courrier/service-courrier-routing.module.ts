import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceCourrierComponent } from './service-courrier.component';

const routes: Routes = [{ path: '', component: ServiceCourrierComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceCourrierRoutingModule { }
