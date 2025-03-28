import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcommerceDetailsComponent } from './ecommerce-details.component';

const routes: Routes = [{ path: '', component: EcommerceDetailsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EcommerceDetailsRoutingModule { }
