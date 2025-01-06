export interface ExpeditionEcomDetailsDto {
  ecomId: number;
  numenvoie: number;  // Type 'number'
  nomClient: string;
  prenomClient: string;
  idbureau: number;   // Type 'number'
  valider: true;
  expeditionEcomId?: number;  // Optionnel, type 'number'
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
