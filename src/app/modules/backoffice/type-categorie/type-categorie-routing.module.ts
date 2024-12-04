import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeCategorieComponent } from './type-categorie.component';

const routes: Routes = [{ path: '', component: TypeCategorieComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeCategorieRoutingModule { }
