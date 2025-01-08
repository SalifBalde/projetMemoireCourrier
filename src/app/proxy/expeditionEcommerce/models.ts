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
  bureauDestination: number;
  numenvoi: string;
  details: ExpeditionEcomDetailsDto[];
}


export interface ExpeditionEcomCreateDto {
  id?: number;
  bureauExpediteur: number;
  bureauDestination: number;
  details: ExpeditionEcomDetailsDto[];
}
