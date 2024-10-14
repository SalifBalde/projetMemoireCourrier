export interface CreateUpdateColisDto {
    id?: string;
    clientId?: string;
    caisseId?: string;
    statusId?: string;
    typeId?: string;
    poidsId?: string;
    bureauDepotId?: string;
    bureauDestinataireId?: string;
    modePaiementId?: string;
    nomDestinataire?: string;
    contenu?: string;
    cniDestinataire?: string;
    prenomDestinataire?: string;
    telephoneDestinataire?: string;
    adresseDestinataire?: string;
    codeRetrait?: string;
    dateLivraison?: string;
    fraisEnlevement?: string;
    fraisLivraison?: string;
    montant?: string;
    annuler?: boolean;
    payer?: boolean;
    livraisonDomicile?: boolean;
    enlevementDomicile?: boolean;
}

export interface ColisDto {
    id?: string;
    code?: string;
    clientId?: string;
    nomClient?: string;
    caisseId?: string;
    caisseLibelle?: string;
    statusId?: string;
    statusLibelle?: string;
    statusCouleur?: string;
    typeId?: string;
    typeLibelle?: string;
    poidsId?: string;
    poidsLibelle?: string;
    bureauDepotId?: string;
    bureauDepotLibelle?: string;
    bureauDestinataireId?: string;
    bureauDestinationLibelle?: string;
    modePaiementId?: string;
    modePaiementLibelle?: string;
    nomDestinataire?: string;
    contenu?: string;
    cniDestinataire?: string;
    prenomDestinataire?: string;
    telephoneDestinataire?: string;
    adresseDestinataire?: string;
    codeRetrait?: string;
    dateLivraison?: string;
    fraisEnlevement?: string;
    fraisLivraison?: string;
    montant?: string;
    annuler?: boolean;
    payer?: boolean;
    livraisonDomicile?: boolean;
    enlevementDomicile?: boolean;
    createdAt?: string;
    details?: ColisDetailsDto[];
}

export interface ColisResultDto {
    id?: string;
    code?: string;
    clientId?: string;
    nomClient?: string;
    caisseId?: string;
    caisseLibelle?: string;
    statusLibelle?: string;
    statusCouleur?: string;
    typeLibelle?: string;
    poidsLibelle?: string;
    bureauDepotLibelle?: string;
    bureauDestinationLibelle?: string;
    modePaiementLibelle?: string;
    nomDestinataire?: string;
    contenu?: string;
    cniDestinataire?: string;
    prenomDestinataire?: string;
    telephoneDestinataire?: string;
    adresseDestinataire?: string;
    codeRetrait?: string;
    dateLivraison?: string;
    fraisEnlevement?: string;
    fraisLivraison?: string;
    montant?: string;
    annuler?: boolean;
    payer?: boolean;
    livraisonDomicile?: boolean;
    enlevementDomicile?: boolean;
    createdAt?: string;
    details?: ColisDetailsDto[];
}

export class ColisDetailsDto {
   // id: string;
    produitId: string;
    produitLibelle: string;
    quantite: number;
    prix: number;
  }

  export class ColisCreateUpdateProduitDto {
    id?: number;
    clientId?: number;
    caisseId?: number;
    modePaiementId?: number;
    bureauDepotId?: number;
    bureauDestinataireId?: number;
    nomDestinataire?: string;
    prenomDestinataire?: string;
    cniDestinataire?: string;
    telephoneDestinataire?: string;
    adresseDestinataire?: string;
    contenu?: string;
    dateLivraison?: Date;
    fraisLivraison?: number;
    fraisEnlevement?: number;
    montant?: number;
    annuler?: boolean;
    payer?: boolean;
    livraisonDomicile?: boolean;
    enlevementDomicile?: boolean;
    statusId?: number;
    typeId?: number;
    details?: ColisDetailsDto[] = [];
  }

  export interface ColisSearchDto {
    statusId?: string;
    typeId?: string;
    userId?: string;
     debut?: string;
     fin?: string;
     nom?: string;
     prenom?: string;
     clientId?:string;
     bureauDepotId?:string;
     bureauDestinataireId?:string;

   }
