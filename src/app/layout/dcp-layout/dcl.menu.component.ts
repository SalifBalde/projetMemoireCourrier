import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'dcl-menu',
    templateUrl: './dcl.menu.component.html',
})
export class DclMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Reporting',
                items: [
                    {
                        label: 'Report Jt Courrier',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/dcl/rapport'],
                    },
                    {
                        label: 'Report  Courrier',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/dcl/rapport-courrier'],
                    },
                    {
                        label: 'Report Ferméture',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/dcl/rapports'],
                    },

                ],
            }, {
                label: 'Traking',


                        items: [
                            {
                                label: 'Suivi Courrier ',
                                icon: 'pi pi-fw pi-eye',
                                routerLink: ['/dcl/traking'],
                            },
                        ],
                    },


        ];
    }
}
