export class CourrierCreateUpdateDto {
    id?: number;
    structureDepotId?: number;
    structureDestinationId?: number;
    montant?: number;
    poids?: number;
    quantite?: number;
    taxeDouane?: number;
    taxePresentation?:number;
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
    statutCourrierLibelle?:string
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
    taxeMagasinage?: number;
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
    idstatutCourrier?: number;
    statutCourrierId?: number;
    statutCourrierLibelle?: string;
    destinataireId?: number;
    destinataireNom?: string;
    destinatairePrenom?: string;
    destinataireTelephone?: string;
    destinataireAdresse?: string;
    destinataireCodePostal?: string;
    destinataireCity?: string;
    categorieId?: number;
    categorieLibelle?: number;
    expediteurId?: number;
    expediteurNom?: string;
    expediteurPrenom?: string;
    expediteurTelephone?: string;
    expediteurAdresse?: string;
    expediteurCodePostal?: string;
    createdAt?:string;
    updatedAt?:string;
    expediteurCity?: string;
    recommande?: boolean;
    ar?: boolean;
    express?: boolean;
    conditionId?: number;
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

   export interface CourrierSearchDto {
    debut?: string;
    fin?: string;
    structureDestinationId?: number;
    structureDepotId?: number;
    userId?: number;
    statutCourrierId?: number;
    typeCourrierId?: number;
    paysOrigineId?:number;
    paysDestinationId?:number;
  }

