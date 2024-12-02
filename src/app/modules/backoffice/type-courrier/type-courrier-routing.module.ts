import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeCourrierComponent } from './type-courrier.component';

const routes: Routes = [{ path: '', component: TypeCourrierComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeCourrierRoutingModule { }
