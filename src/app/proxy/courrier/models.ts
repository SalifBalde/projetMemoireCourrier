export interface CourrierCreateUpdateDto {
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
  }

  export interface CourrierDto {
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
    typeCourrierId: number;
    paysOrigineId?: number;
    paysDestinationId?: number;
    statutCourrierId?: number;
    destinataireId?: number;
    typeCategorieId?: number;
    expediteurId?: number;
  }




