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
    zoneId?: string;
    zoneLibelle?:string;
    zonePoidsMax?:number;
    maxKgAutorise?:number;
    active?:boolean;
}
