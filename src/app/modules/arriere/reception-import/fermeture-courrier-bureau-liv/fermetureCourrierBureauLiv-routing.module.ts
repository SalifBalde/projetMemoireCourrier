import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FermetureCourrierBureauLivComponent} from "./fermeture-courrier-bureau-liv.component";

const routes: Routes = [{ path: '', component: FermetureCourrierBureauLivComponent },
    {path:'arriere/reception-import/fermetureCourrierBureauLiv' , component:FermetureCourrierBureauLivComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FermetureCourrierBureauLivRoutingModule { }
