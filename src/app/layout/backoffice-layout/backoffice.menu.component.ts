import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

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
                label: 'Rapport Colis',
                items: [
                    { label: 'Colis', icon: 'pi pi-fw pi-plus', routerLink: [''] },
                    { label: 'Mes Colis', icon: 'pi pi-fw pi-box', routerLink: [''] },
                ]
            },
            {
                label: 'Gestion Colis',
                items: [
                    { label: 'Location', icon: 'pi pi-fw pi-plus', routerLink: [''] },
                    { label: 'Mes Locations', icon: 'pi pi-fw pi-folder', routerLink: [''] },

                ]
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
                        ]
                    },

                ]
            },

        ];
    }
}
