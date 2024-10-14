import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CreerColisProduitRoutingModule } from './creer-colis-produit-routing.module';
import { CreerColisProduitComponent } from './creer-colis-produit.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';


@NgModule({
  declarations: [
    CreerColisProduitComponent,
    CustomCurrencyPipe
  ],
  imports: [
    CommonModule,
    SharedComponentModule,
    CreerColisProduitRoutingModule,
    AutoCompleteModule,
    TableModule
  ],
  providers: [MessageService]

})
export class CreerColisProduitModule { }
