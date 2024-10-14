import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrpComponent } from './drp.component';

const routes: Routes = [{ path: '', component: DrpComponent }, { path: 'rapport', loadChildren: () => import('./rapport/rapport.module').then(m => m.RapportModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrpRoutingModule { }
