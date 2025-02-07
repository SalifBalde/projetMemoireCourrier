export  interface PaysUpdatedto{
    id?:string;
    libelle?:string;
    zoneId?:string;
    maxKgAutorise?:number;
    active?:boolean;
}



export  interface Paysdto{
    id?: number;
    libelle?: string;
    capital?:string;
    code?:string
    zoneId?: number;
    zoneLibelle?:string;
    zonePoidsMax?:number;
    maxKgAutorise?:number;
    active?:boolean;
}
