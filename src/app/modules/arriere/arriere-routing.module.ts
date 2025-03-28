import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArriereComponent } from './arriere.component';
import {
    ExpeditionCourrierPacketImportModule
} from "./expedition/expedition-packet-import/expeditionCourPacketImport.module";

const routes: Routes = [{ path: '', component: ArriereComponent },
//routes courrier ARRIERE
{ path: 'reception/reception-arriere', loadChildren: () => import('./reception/reception-arriere/reception-arriere.module').then(m => m.ReceptionArriereModule) },
{ path: 'reception/receptionPacket-arriere', loadChildren: () => import('./reception/reception-arriere/reception-packet/receptionPacket-arriere.module').then(m => m.ReceptionPacketArriereModule) },
{ path: 'reception/receptioncolis-arriere', loadChildren: () => import('./reception/reception-arriere/reception-colis/receptionColis-arriere.module').then(m => m.ReceptionColisArriereModule) },
{ path: 'expedition/expedition-arriere', loadChildren: () => import('./expedition/expedition-arriere/expedition-arriere.module').then(m => m.ExpeditionArriereModule) },
{ path: 'expedition/expeditionPacket-arriere', loadChildren: () => import('./expedition/expedition-arriere/expedition-packet/expeditionPacket-arriere.module').then(m => m.ExpeditionPacketArriereModule) },
{ path: 'expedition/expeditionColis-arriere', loadChildren: () => import('./expedition/expedition-arriere/expedition-colis/expeditionColis-arriere.module').then(m => m.ExpeditionColisArriereModule) },

    { path: 'reception-import/receptionCourrierImport/:id', loadChildren: () => import('./reception-import/reception-import.module').then(m => m.ReceptionImportModule) },
    { path: 'reception-import/receptionColisImport/:id', loadChildren: () => import('./reception-import/reception-colis-import/receptionColis-import.module').then(m => m.ReceptionColisImportModule) },
    { path: 'reception-import/receptionCourrierBureau/:id', loadChildren: () => import('./reception-import/reception-courrier-bureau/reception-courrier-bureau.module').then(m => m.ReceptionCourrierBureauModule) },
    { path: 'reception-import/receptionPacketBureau/:id', loadChildren: () => import('./reception-import/reception-packet-bureau-liv/reception-packet.module').then(m => m.ReceptionPacketModule) },
    { path: 'reception-import/receptionColisBureau/:id', loadChildren: () => import('./reception-import/reception-colis-bureau/reception-colis-bureau.module').then(m => m.ReceptionColisBureauModule) },
    { path: 'reception-import/receptionPacketImport/:id', loadChildren: () => import('./reception-import/reception-packet-import/reception-packet-import.module').then(m => m.ReceptionPacketImportModule) },


    { path: 'expedition', loadChildren: () => import('./expedition/expedition.module').then(m => m.ExpeditionModule) },
    { path: 'expedition/expeditionpacket', loadChildren: () => import('./expedition/expedition-packet/expeditionPacket.module').then(m => m.ExpeditionPacketModule) },
    { path: 'reception', loadChildren: () => import('./reception/reception.module').then(m => m.ReceptionModule) },
    { path: 'reception/receptionColis', loadChildren: () => import('./reception/reception-colis/reception-colis.module').then(m => m.ReceptionColisModule) },
    { path: 'reception/reception-E-commerce-livraison', loadChildren: () => import('./reception/reception-E-commerce-livraison/reception-E-commerce.module').then(m => m.ReceptionECommerceModule) },
    { path: 'reception/reception-E-commerce-expedition', loadChildren: () => import('./reception/reception-E-commerce-expedition/reception-E-commerce.module').then(m => m.ReceptionECommerceModule) },

//    { path: 'expedition', loadChildren: () => import('./expedition/expedition.module').then(m => m.ExpeditionModule) },
    { path: 'expedition/expeditionColis', loadChildren: () => import('./expedition/expedition-colis/expeditionColis.module').then(m => m.ExpeditionColisModule) },
    { path: 'expedition/expedition-E-commerce', loadChildren: () => import('./expedition/expedition-E-commerce/expedition-E-commerce.module').then(m => m.ExpeditionECommerceModule) },
    { path: 'rapport', loadChildren: () => import('./rapport/rapport.module').then(m => m.RapportArriereModule) },
    {  path: 'reception/fermetureCourrierImport', loadChildren: () => import('./reception-import/fermeture-courrier-import/fermeture-import.module').then(m => m.FermetureImportModule) },
    {  path: 'reception/fermetureColisImport', loadChildren: () => import('./reception-import/fermeture-colis-import/fermetureColis-import.module').then(m => m.FermetureColisImportModule) },
    { path: 'expedition-courrier-import/expeditionCourrierImport', loadChildren: () => import('./expedition/expedition-courrier-import/expeditionCourrierImport.module').then(m => m.ExpeditionCourrierImportModule) },
    { path: 'expedition-courrier-import/expeditionColisImport', loadChildren: () => import('./expedition/expedition-colis-import/expeditionColisImport.module').then(m => m.ExpeditionColisImportModule) },
    { path: 'expedition-packet-import/expedition-packet-import', loadChildren: () => import('./expedition/expedition-packet-import/expeditionCourPacketImport.module').then(m => m.ExpeditionCourrierPacketImportModule) },
    {  path: 'reception-import/fermetureCourrierBureauLiv', loadChildren: () => import('./reception-import/fermeture-courrier-bureau-liv/fermeture-BureauLiv.module').then(m => m.FermetureCourrierBureauLivModule) },
    {  path: 'reception-import/fermeturePacketBureauLiv', loadChildren: () => import('./reception-import/fermeture-packet-bureau-liv/fermeture-packet-BureauLiv.module').then(m => m.FermeturePacketBureauLivModule) },
    {  path: 'reception-import/fermetureColisBureauLiv', loadChildren: () => import('./reception-import/fermeture-colis-bureau-liv/fermeture-colis-BureauLiv.module').then(m => m.FermetureColisBureauLivModule) },
    {  path: 'reception/fermeturePacketImport', loadChildren: () => import('./reception-import/fermeture-packet-import/fermeture-packet-import.module').then(m => m.FermeturePacketImportModule) },
    //routes courrier interieur
    {  path: 'reception/fermetureColisOrdinaire', loadChildren: () => import('./reception/fermeture-colis-ordinaire/fermetureColis-ordinaire.module').then(m => m.FermetureColisOrdinaireModule) },
    {  path: 'reception/fermetureLettreInterieur', loadChildren: () => import('./reception/fermeture-lettre-interieur/fermeturelettre-interieur.module').then(m => m.FermeturelettreInterieurModule) },
    {  path: 'reception/fermeturePacketInterieur', loadChildren: () => import('./reception/fermeture-packet-interieur/fermeturePacket-interieur.module').then(m => m.FermeturePacketInterieurModule) },
    { path: 'reception/receptionColis/:id', loadChildren: () => import('./reception/reception-colis/reception-colis.module').then(m => m.ReceptionColisModule) },
    { path: 'reception/:id', loadChildren: () => import('./reception/reception.module').then(m => m.ReceptionModule) },
    { path: 'reception/reception-packet/:id', loadChildren: () => import('./reception/reception-packet/reception-packet.module').then(m => m.ReceptionPacketModule) },

//    { path: 'details-expedition/:id', loadChildren: () => import('./details-expedition/details-expedition.module').then(m => m.DetailsExpeditionModule) },
    { path: 'details-expeditionEcom/:id', loadChildren: () => import('./detail-expeditionEcom/detail-expeditionEcom.module').then(m => m.DetailExpeditionEcomModule) },
    { path: 'RapportEcommerce', loadChildren: () => import('./rapportEcommerce/rapportEcommerce.module').then(m => m.RapportEcommerceModule) },
    { path: 'courrier-details/courrierDetailArriere/:id', loadChildren: () => import('./expedition/expedition-arriere/courrier-details/courrier-details.module').then(m => m.CourrierDetailsArriereModule) },

    { path: 'courrier-details-rapport/courrierDetailArriere/:id', loadChildren: () => import('./rapport/courrier-details-rapport/courrier-details.module').then(m => m.CourrierDetailsrapportModule) },

     // saisir le courrier pour la reception

    { path: 'ajouter-courrier/courrierDetailArriere', loadChildren: () => import('./ajout-courrier/reception-line-packet.module').then(m => m.ReceptionCourrierArriereModule) },
    { path: 'traking', loadChildren: () => import('./traking/traking.module').then(m => m.TrakingModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes
    )],
    exports: [RouterModule]
})
export class ArriereRoutingModule { }
