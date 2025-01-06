export interface ExpeditionEcomDetailsDto {
    numenvoie: string;
    ecomId: number;
    nomClient: string;
    prenomClient: string;
    idbureau: string;
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
