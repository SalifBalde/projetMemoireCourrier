import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FermeturePacketImportComponent} from "./fermeture-packet-import.component";

const routes: Routes = [{ path: '', component: FermeturePacketImportComponent },
    {path:'arriere/reception-import/receptionCourrierImport' , component:FermeturePacketImportComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FermeturePacketImportRoutingModule { }
