export interface CreateUpdateProduitDto {
    id: string;
    libelle?: string;
    description: string;
    active: boolean;
}

export interface ProduitDto {
    id?: string;
    libelle?: string;
    description?: string;
    active?: boolean;
}
