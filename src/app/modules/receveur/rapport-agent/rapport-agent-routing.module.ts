import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RapportAgentComponent } from './rapport-agent.component';

const routes: Routes = [{ path: '', component: RapportAgentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RapportAgentRoutingModule { }
