import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivraisonEcomComponent } from './livraison-ecom.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { LivraisonEcomRoutingModule } from './livraison-ecom-routing.module';
import { TimelineModule } from 'primeng/timeline';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    ConfirmDialogModule,
    LivraisonEcomRoutingModule,
    TimelineModule
  ],
  declarations: [LivraisonEcomComponent]
})
export class LivraisonEcomModule { }
