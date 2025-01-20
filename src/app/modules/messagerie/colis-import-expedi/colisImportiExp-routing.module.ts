import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ColisImportExpediComponent} from "./colis-import-expedi.component";
const routes: Routes = [{ path: '', component: ColisImportExpediComponent },
    { path: 'rapport', loadChildren: () => import('./colisImportExp.module').then(m => m.ColisImportExpModule) },
   { path: 'colis-import-exp', loadChildren: () => import('./colisImportExp.module').then(m => m.ColisImportExpModule) }
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColistImportExpRoutingModule { }
