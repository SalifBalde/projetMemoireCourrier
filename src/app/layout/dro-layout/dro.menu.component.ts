import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { IndexComponent } from 'src/app/modules/dro/index/index.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'dro-menu',
    templateUrl: './dro.menu.component.html',
})
export class DroMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'DRO',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: [''],
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
                        routerLink: ['/dro/rapport-courrier'],
                    },
                    {
                        label: 'Rapport E-commerce',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/dro/rapport-ecom'],
                    },
                ],
            },

        ];
    }
}
