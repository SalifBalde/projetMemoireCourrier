export interface ExpeditionEcomDetailsDto {
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
}
