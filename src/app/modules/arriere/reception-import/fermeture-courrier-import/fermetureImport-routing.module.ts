import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FermetureService} from "../../../../proxy/fermeture";
import {FermetureCourrierImportComponent} from "./fermeture-courrier-import.component";

const routes: Routes = [{ path: '', component: FermetureCourrierImportComponent },
    {path:'arriere/reception-import/receptionCourrierImport' , component:FermetureCourrierImportComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FermetureImportRoutingModule { }
