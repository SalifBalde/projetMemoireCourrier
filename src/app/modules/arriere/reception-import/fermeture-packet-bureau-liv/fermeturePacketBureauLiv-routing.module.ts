import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FermeturePacketBureauLivComponent} from "./fermeture-packet-bureau-liv.component";

const routes: Routes = [{ path: '', component: FermeturePacketBureauLivComponent },
    {path:'arriere/reception-import/fermeturePacketBureauLiv' , component:FermeturePacketBureauLivComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FermeturePacketBureauLivRoutingModule { }
