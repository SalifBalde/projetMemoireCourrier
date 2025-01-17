import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RapportAgentRoutingModule } from './rapport-agent-routing.module';
import { RapportAgentComponent } from './rapport-agent.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';


@NgModule({
  declarations: [
    RapportAgentComponent
  ],
  imports: [
    SharedComponentModule,
    RapportAgentRoutingModule
  ]
})
export class RapportAgentModule { }
