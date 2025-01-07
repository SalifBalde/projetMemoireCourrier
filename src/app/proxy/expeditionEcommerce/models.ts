export interface ExpeditionEcomDetailsDto {
  ecomId: number;
  ecomNumenvoie: string;  // Type 'number'
  ecomNomClient: string;
  ecomPrenomClient: string;
  ecomIdbureau: string;   // Type 'number'
  Valider: boolean;
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
