import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FermetureService} from "../../../../proxy/fermeture";
import {FermetureColisImportComponent} from "./fermeture-colis-import.component";

const routes: Routes = [{ path: '', component: FermetureColisImportComponent },
    {path:'arriere/reception-import/receptionCourrierImport' , component:FermetureColisImportComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FermetureColisImportRoutingModule { }
