import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetournerEnvoiComponent } from './retourner-envoi.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { RetournerEnvoiRoutingModule } from './retourner-envoi-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    RetournerEnvoiRoutingModule
  ],
  declarations: [RetournerEnvoiComponent]
})
export class RetournerEnvoiModule { }
