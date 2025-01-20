import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourrierImportExpediComponent} from "./courrier-import-expedi.component";
const routes: Routes = [{ path: '', component: CourrierImportExpediComponent },
    { path: 'rapport', loadChildren: () => import('./courrierImportExp.module').then(m => m.CourrierImportExpModule) },
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourrierImportiExpRoutingModule { }
