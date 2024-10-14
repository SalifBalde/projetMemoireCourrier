import { NgModule } from '@angular/core';
import { TarifPoidsRoutingModule } from './tarif-poids-routing.module';
import { TarifPoidsComponent } from './tarif-poids.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';


@NgModule({
  declarations: [
    TarifPoidsComponent
  ],
  imports: [
    SharedComponentModule,
    TarifPoidsRoutingModule
  ]
})
export class TarifPoidsModule { }
