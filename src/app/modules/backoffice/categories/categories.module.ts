import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedComponentModule
  ],
  declarations: [CategoriesComponent]
})
export class CategoriesModule { }
