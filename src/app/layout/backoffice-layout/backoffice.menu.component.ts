import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'backoffice-menu',
    templateUrl: './backoffice.menu.component.html'
})
export class BackofficeMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Backoffice',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: [''] }
                ]
            },
            {
                label: 'Tracking',
                items: [
                    { label: 'Tracking E-commerce', icon: 'pi pi-fw pi-search', routerLink: ['/backoffice/track-ecommerce'] },
                    { label: 'E-commerce en Instance', icon: 'pi pi-fw pi-search', routerLink: ['/backoffice/ecommerce-instance'] },

                ]
            },
            // {
            //     label: 'Retouner',
            //     items: [
            //         {
            //             label: 'Envoi a retourner',
            //             icon: 'pi pi-fw pi-file-pdf',
            //             routerLink: ['/backoffice/retourner-envoi'],
            //         },
            //     ],
            // },
            {
                label: 'Paramétres',
                icon: 'pi pi-fw pi-briefcase',
                items: [

                    {
                        label: 'Paramétres',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Produits',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/produits']
                            },

                            {
                                label: 'Type Produit', icon: 'pi pi-fw pi-angle-right', routerLink: ['/backoffice/type-produit']
                            },
                            {
                                label: 'Partenaires',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/partenaires']
                            },

                            {
                                label: 'Themes',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/themes']
                            },
                            {
                                label: 'Pays',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/pays']
                            },
                            {
                                label: 'Zones',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/zones']
                            },
                            {
                                label: 'TypeCourriers',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/typeCourriers']
                            },
                            {
                                label: 'CategorieCourrier',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink:['/backoffice/categories']
                            },
                            {
                                label: 'TypeCategories',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/typeCategories']
                            },
                            {
                                label: 'Regimes',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/regimes']
                            },
                            {
                                label: 'PoidsCourriers',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/poidsCourriers']
                            },
                            {
                                label: 'ServiceCourriers',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/serviceCourriers']
                            },
                            {
                                label: 'Acheminement',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/acheminement']
                            },

                        ]
                    },

                ]
            },

        ];
    }
}
