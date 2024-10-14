export interface CreateUpdateDistanceBureauDto {
    id: string;
    bureauDepotId: string;
    bureauArrive: string;
    distance: string;
}

export interface DistanceBureauDto {
    id?: string;
    bureauDepotId?: string;
    bureauDepotLibelle?: string;
    bureauArriveId?: string;
    bureauArriveLibelle?: string;
    distance?: string;
}
