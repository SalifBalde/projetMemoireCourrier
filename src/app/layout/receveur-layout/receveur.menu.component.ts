import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { IndexComponent } from 'src/app/modules/receveur/index/index.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'receveur-menu',
    templateUrl: './receveur.menu.component.html',
})
export class ReceveurMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Receveur',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: [''],
                    },
                ],
            },
            {
                label: 'SuiviCourrier',
                items: [
                    {
                        label:'suiviCourrier',
                        icon : 'pi pi-fw pi-search',
                        routerLink:['/receveur/suiviCourrier']
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
                        routerLink: [''],
                    },
                    {
                        label: 'C10 Bureau',
                        icon: 'pi pi-fw pi-box',
                        routerLink: [''],
                    },
                ],
            },
            {
                label: 'Rapports',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Rapport Agent',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/receveur/rapport'],
                    },
                    {
                        label: 'Rapport par critères',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/receveur/rapport-criteres'],
                    },
                ],
            },
        ];
    }
}
