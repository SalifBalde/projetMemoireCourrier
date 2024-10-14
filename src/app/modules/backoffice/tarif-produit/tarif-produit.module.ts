import { NgModule } from '@angular/core';
import { TarifProduitRoutingModule } from './tarif-produit-routing.module';
import { TarifProduitComponent } from './tarif-produit.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';


@NgModule({
  declarations: [
    TarifProduitComponent
  ],
  imports: [
    SharedComponentModule,
    TarifProduitRoutingModule
  ]
})
export class TarifProduitModule { }
