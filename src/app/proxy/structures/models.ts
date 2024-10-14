export interface CreateUpdateStructureDto {
    id: string;
    libelle: string;
    description: string;
    active: boolean;
}

export interface StructureDto {
    id?: string;
    libelle?: string;
    description?: string;
    active?: boolean;
}
