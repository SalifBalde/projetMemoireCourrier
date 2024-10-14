import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColisDetailsComponent } from './colis-details.component';

const routes: Routes = [{ path: '', component: ColisDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColisDetailsRoutingModule { }
