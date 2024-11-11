

export interface StockDto {
    id: number;
    quantite: number;
    caisseId: number;
    caisseLibelle: string | null;
    produitId: number;
    produitLibelle: string;
    produitThemeLibelle: string;
    produitPrix: string;
    produitCodeBarre: string;
    produitTypeProduitLibelle: string;
  }
