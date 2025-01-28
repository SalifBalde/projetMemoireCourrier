import {Fermeturecourrierdto} from "../fermetureCourrier";

export  interface FermetureUpdatedto{
    structureDepotId?: number;
    structureDestinationId?: number;
    numeroDepeche?: string;
    date?: Date;
    userId?: number;
    idstatutCourrier: number;
    fermetureCourriers: Fermeturecourrierdto[];

}



export interface Fermeturedto {
    id?:number;
    structureDepotId?: number;
    structureDepotLibelle?: string;
    structureDestinationId?: number;
    structureDestinationLibelle?: string;
    numeroDepeche?: string;
    date?:string;
    userId?:number;
    idstatutCourrier :number;
    fermetureCourriers: Fermeturecourrierdto[] ;  // Doit contenir des objets avec courrierId
}

export interface FermetureSearchDto {
    debut?: string;
    fin?: string;
}
