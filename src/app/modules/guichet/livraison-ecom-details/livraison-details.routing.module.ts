import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivraisonDetailsComponent } from './livraison-details.component';

const routes: Routes = [{ path: '', component: LivraisonDetailsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LivraisonDetailsRoutingModule { }
