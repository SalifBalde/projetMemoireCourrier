import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivraisonRoutingModule } from './livraison-routing.module';
import { LivraisonComponent } from './livraison.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { TreeTableModule } from 'primeng/treetable';
import { MessageService, ConfirmationService} from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';




@NgModule({
  declarations: [
LivraisonComponent    
  ],
  imports: [
    SharedComponentModule,
    LivraisonRoutingModule,
    TreeTableModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
})
export class LivraisonModule { }
