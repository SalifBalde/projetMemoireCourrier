export interface ExpeditionEcomDetailsDto {
    ecomNumenvoie: string;
    ecomId: number;
    ecomNomClient: string;
    ecomPrenomClient: string;
    ecomIdbureau: string;
    valider: boolean;
}


  export interface ExpeditionEcomDto {
    id: number;
    bureauExpediteur: number;
    bureauDestination: number;
    numero: string;
    details: ExpeditionEcomDetailsDto[];
  }
  export interface ExpeditionEcomCreateDto {
    id?: number;
    bureauExpediteur: number;
    bureauDestination: number;
    details: ExpeditionEcomDetailsDto[];
}
