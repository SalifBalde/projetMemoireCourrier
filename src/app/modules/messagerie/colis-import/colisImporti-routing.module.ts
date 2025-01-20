import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ColisImportComponent} from "./colis-import.component";
const routes: Routes = [{ path: '', component: ColisImportComponent },
    { path: 'reception', loadChildren: () => import('./colisImport.module').then(m => m.ColisImportModule) },
    { path: 'expedition', loadChildren: () => import('./colisImport.module').then(m => m.ColisImportModule) },
    { path: 'rapport', loadChildren: () => import('./colisImport.module').then(m => m.ColisImportModule) },
   { path: 'colis-import', loadChildren: () => import('./colisImport.module').then(m => m.ColisImportModule) }
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColistImportRoutingModule { }
