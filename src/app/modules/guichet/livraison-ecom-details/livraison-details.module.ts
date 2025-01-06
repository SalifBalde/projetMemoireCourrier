import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from "primeng/card";
import { LivraisonDetailsComponent } from './livraison-details.component';
import { LivraisonDetailsRoutingModule } from './livraison-details.routing.module';


@NgModule({
    declarations: [
        LivraisonDetailsComponent
    ],
    imports: [
        SharedComponentModule,
        TimelineModule,
        LivraisonDetailsRoutingModule,
        CardModule
    ]
})
export class LivraisonDetailsModule { }
