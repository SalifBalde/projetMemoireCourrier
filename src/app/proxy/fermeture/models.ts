import {Fermeturecourrierdto} from "../fermetureCourrier";

export  interface FermetureUpdatedto{
    structureDepotId?: number;
    structureDestinationId?: number;
    numeroDepeche?: string;
    date?: Date;
    userId?: number;
    idStatutCourrier: number;
    fermetureCourriers: Fermeturecourrierdto[];

}



export interface Fermeturedto {
    structureDepotId?: number;
    structureDestinationId?: number;
    numeroDepeche?: string;
    date?:string;
    userId?:number;
    idStatutCourrier :number;
    fermetureCourriers: Fermeturecourrierdto[] ;  // Doit contenir des objets avec courrierId
}
