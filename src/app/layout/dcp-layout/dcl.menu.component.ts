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

            {
                label: 'Paramétres',
                icon: 'pi pi-fw pi-briefcase',
                items: [

                    {
                        label: 'Paramétres',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {


                                label: 'Pays',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/dcl/payss']

                            },
                            {
                                label: 'Zones',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/dcl/zones']
                            },
                            {
                                label: 'PoidsCourriers',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/dcl/poidsCourriers']
                            },
                            {
                                label: 'CategorieCourrier',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/dcl/categories']
                            },
                            {
                                label: 'Acheminement',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/dcl/acheminement']
                            },
                            {
                                label: 'ServiceCourriers',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/dcl/serviceCourriers']
                            },
                            {
                                label: 'TypeCategories',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/dcl/typeCategories']
                            },
                            {
                                label: 'TypeCourriers',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/dcl/typeCourriers']
                            },
                            {
                                label: 'Regimes',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/dcl/regimes']
                            },
                            ]
                    }
                    ]
            }
        ];

    }
}
