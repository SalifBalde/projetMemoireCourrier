export interface ExpeditionEcomDetailsDto {
    ecomCode: string;
    ecomId: number;
    ecomNomDestinataire: string;
    ecomPrenomDestinataire: string;
    bureauDestination: string;
    bureauDepot: string;
    ecomBureauDestinataireId: number;
    ecomBureauDepotId: number;
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