import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FermetureColisBureauLivComponent} from "./fermeture-colis-bureau-liv.component";

const routes: Routes = [{ path: '', component: FermetureColisBureauLivComponent },
    {path:'arriere/reception-import/fermetureColisBureauLiv' , component:FermetureColisBureauLivComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FermetureColisBureauLivRoutingModule { }
