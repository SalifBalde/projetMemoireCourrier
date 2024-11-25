export interface CreateUpdateTypeProduitDto {
    id: string;
    libelle?: string;
    description: string;
    active: boolean;
}

export interface TypeProduitDto {
    id?: string;
    libelle?: string;
    description?: string;
    active?: boolean;
}
