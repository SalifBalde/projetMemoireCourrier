export interface ExpeditionEcomDetailsDto {
  ecommerceId: number;
  ecommerceNumenvoie: string;
  ecommerceNomClient: string;
  ecommercePrenomClient: string;
  ecommerceIdbureau: number;
  valider: boolean;
}


export interface ExpeditionEcomDto {
  id: number;
  bureauExpediteur: number;
  bureauExpediteurLibelle: string;
  bureauDestination: number;
  bureauDestinataireLibelle: string;
  numenvoi: string;
  details: ExpeditionEcomDetailsDto[];
}


export interface ExpeditionEcomCreateDto {
  id?: number;
  bureauExpediteur: number;
  bureauDestination: number;
  details: ExpeditionEcomDetailsDto[];
}
