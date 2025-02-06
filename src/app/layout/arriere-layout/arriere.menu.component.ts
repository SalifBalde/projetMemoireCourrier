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
                label: 'Expédition  Interieur',
                items: [

                    {
                        label: '--- Expédition Interieur ---',
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
                label: 'Reception  Interieur',
                items: [

                            {
                                label: '--- Réception Interieur ---',
                                styleClass: 'menu-separator',
                                items: [
                                    {
                                        label: ' Lettre Arrière',
                                        icon: 'pi pi-fw pi-download',
                                        routerLink: ['/arriere/reception/reception-arriere'],
                                    }, {
                                        label: ' Packet Arrière',
                                        icon: 'pi pi-fw pi-download',
                                        routerLink: ['/arriere/reception/receptionPacket-arriere'],
                                    },
                                    {
                                        label: ' Colis Arrière',
                                        icon: 'pi pi-fw pi-download',
                                        routerLink: ['/arriere/reception/receptioncolis-arriere'],
                                    },
                                ],
                            },

                ],
            },

            ...(this.isNoeudAcheminement
                ? [
                    {
                        label: 'Expedition ',
                        items: [
                            {
                                label: 'Lettre',
                                icon: 'pi pi-fw pi-send',
                                routerLink: ['/arriere/expedition'],
                            },
                            {
                                label: 'Packet',
                                icon: 'pi pi-fw pi-send',
                                routerLink: ['/arriere/expedition/expeditionpacket'],
                            },
                            {
                                label: 'Colis',
                                icon: 'pi pi-fw pi-send',
                                routerLink: ['/arriere/expedition/expeditionColis'],
                            },
                        ],
                    },
                ]
                : []),
            {
                label: 'Reception Par Saisi',
                items: [
                    {
                        label: 'Reception( courrier et colis)',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/arriere/ajouter-courrier/courrierDetailArriere'],
                    }

                ]
            },


            {
                label: 'Reception ',
                items: [
                    {
                        label: 'Lettre',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/arriere/reception/fermetureLettreInterieur'],
                    },
                    {
                        label: 'Packet',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/arriere/reception/fermeturePacketInterieur'],
                    },
                    {
                        label: ' Colis ',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/arriere/reception/fermetureColisOrdinaire'],
                        styleClass: 'small-parentheses'
                    },


                ]
            },
            {
                label: 'E-commerce',
                items: [
                    {
                        label: 'Réception E-com à livrer ',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/arriere/reception/reception-E-commerce-livraison'],
                    },
                    {
                        label: 'Réception E-com à expédier ',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/arriere/reception/reception-E-commerce-expedition'],
                    },
                ],
            },
            ...(this.isNoeudAcheminement
                ? [
                    {
                        label: 'Expédition Import',
                        items: [
                            {
                                label: '--- Expédition Import ---',
                                styleClass: 'menu-separator',
                                items: [
                                    {
                                        label: 'Expédition Lettre Import',
                                        icon: 'pi pi-fw pi-send',
                                        routerLink: ['/arriere/expedition-courrier-import/expeditionCourrierImport'],
                                    },
                                    {
                                        label: 'Expédition Packet Import',
                                        icon: 'pi pi-fw pi-send',
                                        routerLink: ['/arriere/expedition-packet-import/expedition-packet-import'],
                                    },
                                    {
                                        label: 'Expédition Colis Import',
                                        icon: 'pi pi-fw pi-send',
                                        routerLink: ['/arriere/expedition-courrier-import/expeditionColisImport'],
                                    },
                                ],
                            },
                        ],
                    },
                ]
                : []),


        // {
        //     label: 'Reception  Import',
        //     items: [
        //
        //
        //         ...(this.isNoeudAcheminement
        //             ? [
        //
        //                 {
        //                     label: '--- Réception Import ---',
        //                     styleClass: 'menu-separator',
        //                     items: [
        //                         {
        //                             label: ' Lettre Import',
        //                             icon: 'pi pi-fw pi-download',
        //                             routerLink: ['/arriere/reception/fermetureCourrierImport'],
        //                         }, {
        //                             label: ' Packet Import',
        //                             icon: 'pi pi-fw pi-download',
        //                             routerLink: ['/arriere/reception/fermeturePacketImport'],
        //                         },
        //                         {
        //                             label: ' Colis Import',
        //                             icon: 'pi pi-fw pi-download',
        //                             routerLink: ['/arriere/reception/fermetureColisImport'],
        //                         },
        //                     ],
        //                 },
        //             ]
        //             : []),
        //     ],
        // },
            //
        //     ,{
        //     // label: 'Reception Import',
        //     items: [
        //         ...(this.isNotNoeudAcheminement
        //             ? [
        //                 {
        //                     label: 'Lettre Import',
        //                     icon: 'pi pi-fw pi-download',
        //                     routerLink: ['/arriere/reception-import/fermetureCourrierBureauLiv'],
        //                 },{
        //                     label: 'Packet Import',
        //                     icon: 'pi pi-fw pi-download',
        //                     routerLink: ['/arriere/reception-import/fermeturePacketBureauLiv'],
        //                 },
        //                 {
        //                     label: 'Colis Import',
        //                     icon: 'pi pi-fw pi-download',
        //                     routerLink: ['/arriere/reception-import/fermetureColisBureauLiv'],
        //                 },
        //             ]
        //             : []), // Corrigez la syntaxe ici en retirant la virgule et en fermant correctement
        //     ],
        // },
            {
                label: 'Reporting',
                items: [
                    {
                        label: 'Report ',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/arriere/rapport'],
                    },
                ],
            },
            {
                label: 'Traking',
                items: [
                    {
                        label: 'Suivi Courrier ',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: ['/arriere/traking'],
                    },
                ],
            },
        ];
    }
}
