export class CourrierCreateUpdateDto {
    id?: number;
    structureDepotId?: number;
    structureDestinationId?: number;
    montant?: number;
    poids?: number;
    quantite?: number;
    taxeDouane?: number;
    taxePresentation?: number;
    userId?: number;
    codeBarre?: string;
    contenu?: string;
    typeCourrierId?: number;
    paysOrigineId?: number;
    paysDestinationId?: number;
    statutCourrierId?: number;
    destinataireId?: number;
    typeCategorieId?: number;
    expediteurId?: number;
    details?: CourrierDetailsDto[]=[] ;

  }

  export interface CourrierDto {
    id?: number;
    structureDepotId?: number;
    structureDepotLibelle?: string;
    structureDestinationId?: number;
    structureDestinationLibelle?: string;
    montant?: number;
    poids?: number;
    quantite?: number;
    taxeDouane?: number;
    taxePresentation?: number;
    userId?: number;
    codeBarre?: string;
    contenu?: string;
    typeCourrierId: number;
    typeCourrierLibelle: string;
    paysOrigineId?: number;
    paysOrigineLibelle?: string;
    paysDestinationId?: number;
    paysDestinationLibelle?: string;
    statutCourrierId?: number;
    destinataireId?: number;
    destinataireNom?: string;
    destinatairePrenom?: string;
    destinataireTelephone?: string;
    typeCategorieId?: number;
    expediteurId?: number;
    expediteurNom?: string;
    expediteurPrenom?: string;
    expediteurTelephone?: string;
    details?: CourrierDetailsDto[] ;
  }


  export class CourrierDetailsDto {
     id?: string;
     produitId?: string;
     produitLibelle?: string;
     combinedLibelle?: string;
     quantite?: number;
     prix?: number;
     montant?: number;
   }


