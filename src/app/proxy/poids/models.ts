export interface CreateUpdatePoidsDto {
    id: string;
    libelle: string;
    description: string;
    active: boolean;
}

export interface PoidsDto {
    id?: string;
    libelle?: string;
    description?: string;
    active?: boolean;
}
