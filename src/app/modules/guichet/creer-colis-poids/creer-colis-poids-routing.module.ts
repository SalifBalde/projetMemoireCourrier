import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreerColisPoidsComponent } from './creer-colis-poids.component';

const routes: Routes = [{ path: '', component: CreerColisPoidsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreerColisPoidsRoutingModule {


}
