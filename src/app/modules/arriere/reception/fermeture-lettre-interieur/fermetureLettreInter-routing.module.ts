import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FermetureLettreInterieurComponent} from "./fermeture-lettre-interieur.component";

const routes: Routes = [{ path: '', component: FermetureLettreInterieurComponent },
    {path:'arriere/reception-import/receptionCourrierImport' , component:FermetureLettreInterieurComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FermetureLettreInterieurRoutingModule { }
