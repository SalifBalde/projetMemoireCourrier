export interface CreateUpdateDistanceDto {
    id: string;
    libelle: string;
    maxDistance: number;
    minDistance: number;
    active: boolean;
}

export interface DistanceDto {
    id?: string;
    libelle?:string;
    maxDistance?:number;
    minDistance?:number;
    active?:boolean;
}
