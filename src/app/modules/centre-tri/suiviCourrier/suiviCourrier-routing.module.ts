import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuiviCourrierComponent } from './suiviCourrier.component';

const routes: Routes = [{ path: '', component: SuiviCourrierComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuiviCourrierRoutingModule { }
