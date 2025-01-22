import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { IndexComponent } from 'src/app/modules/receveur/index/index.component';

@Component({
    selector: 'responsableannexe-menu',
    templateUrl: './responsableannexe.menu.component.html',
})
export class ResponsableannexeMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Responsable Annexe',
                items: [
                   { label: 'Choix Module', icon: 'pi pi-fw pi-home', url: 'https://digitalpostv2.sn.post/' }
                ],
            },
            {
                label: 'SuiviCourrier',
                items: [
                    {
                        label:'suiviCourrier',
                        icon : 'pi pi-fw pi-search',
                        routerLink:['/responsableannnexe/suiviCourrier']
                    }
                ]
            },
            {
                label: 'Gestion des Rapport',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'C 10',
                        icon: 'pi pi-fw pi-box',
                       // routerLink: [''],
                    },
                    {
                        label: 'C10 Bureau',
                        icon: 'pi pi-fw pi-box',
                      //  routerLink: [''],
                    },
                ],
            },
            {
                label: 'Rapports',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Rapport Courrier',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/responsableannnexe/rapport-courrier'],
                    },
                    {
                        label: 'Rapport E-commerce',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/responsableannnexe/rapport-ecom'],
                    },
                ],
            },
        ];
    }
}
