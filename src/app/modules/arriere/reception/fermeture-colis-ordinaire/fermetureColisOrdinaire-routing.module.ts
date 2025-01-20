import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FermetureColisOrdinaireComponent} from "./fermeture-colis-ordinaire.component";

const routes: Routes = [{ path: '', component: FermetureColisOrdinaireComponent },
    {path:'arriere/reception-import/receptionCourrierImport' , component:FermetureColisOrdinaireComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FermetureColisOrdinaireRoutingModule { }
