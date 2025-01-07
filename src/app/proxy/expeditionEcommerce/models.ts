export interface ExpeditionEcomDetailsDto {
<<<<<<< HEAD
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
=======
  ecommerceId: number; // ID de l'e-commerce
  ecommerceNumenvoie: string; // Numéro d'envoi
  ecommerceNomClient: string; // Nom du client
  ecommercePrenomClient: string; // Prénom du client
  ecommerceIdbureau: number; // ID du bureau
  valider: boolean; // Statut de validation
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
>>>>>>> 284f8f14de081f7e0834100b959d98044284c35f
}
