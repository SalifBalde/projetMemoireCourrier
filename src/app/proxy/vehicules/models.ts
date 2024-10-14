export interface CreateUpdateVehiculeDto {
    id: string;
    libelle?: string;
    description: string;
    active: boolean;
}

export interface VehiculeDto {
    id?: string;
    libelle?: string;
    description?: string;
    active?: boolean;
}
