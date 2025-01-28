export interface EcommerceDto {
  id: number;
  dateexp: string;
  datelivraison: string;
  montantverse: number;
  numenvoi: string;
  numversement: string;
  observation: string;
  partenaireEcomId: number;
  IdbureauPartenaire: number;
  partenaireBureauLibelle: string;
  partenaireLibelle: string;
  taxetransp: number;
  idbureau: number;
  bureauDestinationLibelle: string;
  iduser: number;
  heurelivraison: string;
  etatEcomId: number;
  etatEcomLibelle : string;
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
  produitEcommerces?: ProduitEcommerceDto[];
  suiviEcoms?: SuiviEcomDto[];
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
  IdbureauPartenaire: number;
  partenaireBureauLibelle: string;
  partenaireLibelle: string;
  bureauDestinationLibelle: string;
  iduser: number;
  heurelivraison: string;
  etatEcomId: number;
  etatEcomLibelle : string;
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

export interface SuiviEcomDto {
  id: number;
  datemaj: string;
  ecommerceId: number;
  bureauId: number;
  userId: number;
  etatEcomId: number;
  motif: string;
  version: number;
  motifretourId: number;
}

export interface ProduitEcommerceDto {
  id: number;
  version: number;
  ecommerceId: number;
  libelle: string;
  marque: string;
  model: string;
  prix: number;
  quantite: number;
}


export interface EcommerceSearchDto {
  partenaire_e_com_id: number;
  idbureau: number;
  IdbureauPartenaire: number;
  numenvoi: string;
  etatEcomId: number;
}

export interface EcommerceCreateUpdateDto {
    journalId?: number;
    userId?: number;
    caisseId?:number;
  }
