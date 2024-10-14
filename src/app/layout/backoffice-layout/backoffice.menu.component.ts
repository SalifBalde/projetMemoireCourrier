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
                label: 'Gestion Colis',
                items: [
                    { label: 'Colis', icon: 'pi pi-fw pi-plus', routerLink: [''] },
                    { label: 'Mes Colis', icon: 'pi pi-fw pi-box', routerLink: [''] },
                ]
            },
            {
                label: 'Gestion Location',
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
                                label: 'Poids',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/poids']
                            },
                            {
                                label: 'Distance',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/distances']
                            },{
                                label: 'Tarif Produit',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/tarifproduits']
                            },
                            {
                                label: 'Tarif Poids',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/tarifpoids']
                            },
                            {
                                label: 'Type Véhicules',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/typeVehicule']
                            },
                            {
                                label: 'Véhicules',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/vehicule']
                            },
                            {
                                label: 'Distance Bureau',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/distancebureau']
                            },

                        ]
                    },

                ]
            },

        ];
    }
}
