export interface CreateUpdatePoidCourrierDto {
    id: string;
    tranche: string;
    min: number;
    max: number;
}

export interface PoidCourrierDto {
    id?: string;
    tranche?: string;
    min?:number;
    max?: number;
}
