import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiviCourrierComponent } from './suiviCourrier.component';
import { SuiviCourrierRoutingModule } from './suiviCourrier-routing.module';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    SuiviCourrierRoutingModule,
    SharedComponentModule
  ],
  declarations: [SuiviCourrierComponent]
})
export class SuiviCourrierModule { }
