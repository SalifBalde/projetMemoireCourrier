export interface EcommerceDto {
    id: number;
    dateexp: string;
    datelivraison: string;
    montantverse: number;
    numenvoi: string;
    numversement: string;
    observation: string;
    partenaireEcomId: number;
    taxetransp: number;
    idbureau: number;
    iduser: number;
    heurelivraison: string;
    etatEcomId: number;
    version: number;
    adresseClient: string;
    nomClient: string;
    payer: boolean;
    telephoneClient: string;
    prenomClient: string;
    livraisonDomicile: boolean;
    natureEnvoiId: number;
    taxeLivraison: number;
    dateRetourner: string;
    echanger: boolean;
    envoiechange: string;
    gabarit: number;
    produitId: number;
    versementEffectuer: boolean;
}


  export interface EcommerceSearchResultDto {
    id: number;
    dateexp: string;
    datelivraison: string;
    montantverse: number;
    numenvoi: string;
    numversement: string;
    observation: string;
    partenaireEcomId: number;
    taxetransp: number;
    idbureau: number;
    iduser: number;
    heurelivraison: string;
    etatEcomId: number;
    version: number;
    adresseClient: string;
    nomClient: string;
    payer: boolean;
    telephoneClient: string;
    prenomClient: string;
    livraisonDomicile: boolean;
    natureEnvoiId: number;
    taxeLivraison: number;
    dateRetourner: string;
    echanger: boolean;
    envoiechange: string;
    gabarit: number;
    produitId: number;
    versementEffectuer: boolean;
  }
