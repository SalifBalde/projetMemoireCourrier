import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchClientComponent } from './searchclient.component';


const routes: Routes = [{ path: '', component: SearchClientComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchclientRoutingModule { }
