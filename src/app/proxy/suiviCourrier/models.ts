export interface SuiviCourrierdto {
    id?: number;
    structureId?: number;
    courrierStructureDepotId?: number;
    courrierStructureDestinationId?: number;
    StructureDepotLibelle?: string;
    StructureDestinationLibelle?: string;
    userId?: number;
    user?: string;
    statutCourrier?: StatutCourrierdto;  
    courrier?: CourrierDto;        
    createdAt?: String;           
}

export interface StatutCourrierdto {
    id: number;
    libelle: string;
    couleur: string;
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
    contenu?: string;
    typeCourrierId?: number;
    typeCourrierLibelle?: string;
    paysOrigineId?: number;
    paysOrigineLibelle?: string;
    paysOrigineCode?: string;
    paysDestinationId?: number;
    paysDestinationLibelle?: string;
    paysDestinationCode?: string;
    statutCourrierId?: number;
    destinataireId?: number;
    destinataireNom?: string;
    destinatairePrenom?: string;
    destinataireTelephone?: string;
    destinataireCodePostal?: string;
    destinataireAdresse?: string;
    categorieId?: number;
    categorieLibelle?: string;
    expediteurId?: number;
    expediteurNom?: string;
    expediteurPrenom?: string;
    expediteurTelephone?: string;
    expediteurCodePostal?: string;
    tnCd?: number;
    codeIps?: string;
    recommande?: boolean;
    ar?: boolean;
    express?: boolean;
    details?: CourrierDetailsDto[];
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