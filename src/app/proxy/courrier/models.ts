export class CourrierCreateUpdateDto {
    id?: number;
    structureDepotId?: number;
    structureDestinationId?: number;
    montant?: number;
    poids?: number;
    quantite?: number;
    taxeDouane?: number;
    taxePresentation?: number;
    valeurDeclare?: number;
    userId?: number;
    caisseId?: number;
    journalId?: number;
    codeBarre?: string;
    contenu?: string;
    typeCourrierId?: number;
    paysOrigineId?: number;
    paysDestinationId?: number;
    statutCourrierId?: number;
    destinataireId?: number;
    categorieId?: number;
    expediteurId?: number;
    recommande?: boolean;
    ar?: boolean;
    express?: boolean;
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
    valeurDeclare?: number;
    userId?: number;
    codeBarre?: string;
    caisseId?: number;
    journalId?: number;
    contenu?: string;
    typeCourrierId?: number;
    typeCourrierLibelle?: string;
    paysOrigineId?: number;
    paysOrigineLibelle?: string;
    paysDestinationId?: number;
    paysDestinationLibelle?: string;
    statutCourrierId?: number;
    destinataireId?: number;
    destinataireNom?: string;
    destinatairePrenom?: string;
    destinataireTelephone?: string;
    categorieId?: number;
    categorieLibelle?: number;
    expediteurId?: number;
    expediteurNom?: string;
    expediteurPrenom?: string;
    expediteurTelephone?: string;
    recommande?: boolean;
    ar?: boolean;
    express?: boolean;
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


