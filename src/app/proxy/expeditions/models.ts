export interface CreateUpdateExpeditionDto {
    id: string;
    bureauExpediteur?: string;
    bureauDestination?: string;
    details?: ExpeditionDetailsDto[];
}

export interface ExpeditionDto {
    id?: string;
    bureauExpediteur?: string;
    bureauDestination?: string;
    bureauExpediteurLibelle?: string;
    numero?: string;
    bureauDestinationLibelle?: string;
    createdAt? :string;
    details?: ExpeditionDetailsDto[];
}

export interface ExpeditionDetailsDto{
    id?: string;
    ecommerceId?:string;
    ecommerceCode?:string;
    ecommercePrenomDestinataire?:string;
    ecommerceNomDestinataire?:string;
    bureauDestination?:string;
    BureauDepot?:string;
}
