export interface EcommerceDto {
    id: number;
    dateExp: string;
    dateLivraison: string;
    montantVerse: number;
    numenvoi: string;
    numVersement: string;
    observation: string;
    partenaireEComId: number;
    taxeTransp: number;
    idBureau: number;
    idUser: number;
    heureLivraison: string;
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
    envoieChange: string;
    gabarit: number;
    produitId: number;
    versementEffectuer: boolean;
  }
  
  export interface EcommerceSearchResultDto {
    id: number;
    dateExp: string;
    dateLivraison: string;
    montantVerse: number;
    numenvoi: string;
    numVersement: string;
    observation: string;
    partenaireEComId: number;
    taxeTransp: number;
    idBureau: number;
    idUser: number;
    heureLivraison: string;
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
    envoieChange: string;
    gabarit: number;
    produitId: number;
    versementEffectuer: boolean;
  }
  