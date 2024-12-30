import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeProduitRoutingModule } from './type-produit-routing.module';
import { TypeProduitComponent } from './type-produit.component';
import {SharedComponentModule} from "../../../layout/shared/shared-component.module";


@NgModule({
  declarations: [
    TypeProduitComponent
  ],
  imports: [
    SharedComponentModule,
    TypeProduitRoutingModule
  ]
})
export class TypeProduitModule { }
