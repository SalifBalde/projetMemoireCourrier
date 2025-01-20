import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FermeturePacketInterieurComponent} from "./fermeture-packet-interieur.component";

const routes: Routes = [{ path: '', component: FermeturePacketInterieurComponent },
    {path:'arriere/reception/receptionPacketImport' , component:FermeturePacketInterieurComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FermeturePacketInterRoutingModule { }
