export interface CreateUpdateTypeVehiculeDto {
    id: string;
    libelle?: string;
    description: string;
    active: boolean;
}

export interface TypeVehiculeDto {
    id?: string;
    libelle?: string;
    description?: string;
    active?: boolean;
}
