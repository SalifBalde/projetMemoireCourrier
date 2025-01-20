import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { Noeuxdto, NouexService } from "../../proxy/noeux";
import { SessionService } from "../../proxy/auth/Session.service";

@Component({
    selector: 'arriere-menu',
    templateUrl: './arriere.menu.component.html',
})
export class ArriereMenuComponent implements OnInit {
    model: any[] = [];
    Bestnoeux: Noeuxdto;
    isNoeudAcheminement: boolean;
    isNotNoeudAcheminement: boolean;

    constructor(public layoutService: LayoutService,
                private sessionService: SessionService,
                private noeuxService: NouexService) {}

    ngOnInit() {
        // Récupérer les données de Bestnoeux
        this.noeuxService.findNoeuxByIdstruct(this.sessionService.getAgentAttributes().structureId.toString()).subscribe(
            (result) => {
                this.Bestnoeux = result;
                console.log(this.Bestnoeux); // Vérification de la valeur récupérée
                this.isNoeudAcheminement = !!this.Bestnoeux; // Si Bestnoeux existe, isNoeudAcheminement sera true
                this.isNotNoeudAcheminement = !this.Bestnoeux;
                console.log(this.isNoeudAcheminement); // Vérification de la condition
                this.setupMenu(); // Mettre à jour le menu après la définition de isNoeudAcheminement
            }
        );


    }

    setupMenu() {
        // Mise à jour du menu une fois isNoeudAcheminement mis à jour
        this.model = [
            {
                label: 'Expédition  Arriere',
                items: [

                    {
                        label: '--- Expédition Arrière ---',
                        styleClass: 'menu-separator',
                        items: [
                            {
                                label: ' Lettre Arrière',
                                icon: 'pi pi-fw pi-send',
                                routerLink: ['/arriere/expedition/expedition-arriere'],
                            }, {
                                label: ' Packet Arrière',
                                icon: 'pi pi-fw pi-send',
                                routerLink: ['/arriere/expedition/expeditionPacket-arriere'],
                            },
                            {
                                label: ' Colis Arrière',
                                icon: 'pi pi-fw pi-send',
                                routerLink: ['/arriere/expedition/expeditionColis-arriere'],
                            },
                        ],
                    },

                ],
            },

            {
                label: 'Reception  Arriere',
                items: [
                    {
                        label: 'Expedition Courrier',
                        icon: 'pi pi-fw pi-send',
                        routerLink: ['/arriere/expedition'],
                    },
                    {
                        label: 'Expedition Colis',
                        icon: 'pi pi-fw pi-send',
                        routerLink: ['/arriere/expedition/expeditionColis'],
                    },
                    {
                        label: 'Expedition E-commerce',
                        icon: 'pi pi-fw pi-send',
                        routerLink: ['/arriere/expedition/expedition-E-commerce'],
                    }
                ],


            },
            {
                label: 'Reception Interieur',
                items: [
                    {
                        label: 'Lettre Interieur',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/arriere/reception/fermetureLettreInterieur'],
                    },
                    {
                        label: 'Packet Interieur',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/arriere/reception/fermeturePacketInterieur'],
                    },
                    {
                        label: ' Colis Interieur',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/arriere/reception/receptionColis'],
                    },
                    {
                        label: 'Reception E-commerce',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/arriere/reception/reception-E-commerce'],
                    },
                ]
            },
            // {
            //     label: 'E-commerce',
            //     items: [

            //         {
            //             // label: 'Reception Courriers',
            //             // icon: 'pi pi-fw pi-download',
            //             // routerLink: ['/arriere/reception'],
            //         },
            //         {
            //             // label: 'Reception Colis',
            //             // icon: 'pi pi-fw pi-download',
            //             // routerLink: ['/arriere/reception/receptionColis'],
            //         },
            //     ]
            // },
            {
                label: 'Reporting',
                items: [
                    {
                        label: 'Report Jt',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/arriere/rapport'],
                    },
                    {
                        label: 'Report Jt Ecommerce',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/arriere/RapportEcommerce'],
                    },
                ],
            },
        ];
    }
}
