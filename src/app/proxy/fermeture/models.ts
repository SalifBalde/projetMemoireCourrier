import {Fermeturecourrierdto} from "../fermetureCourrier";
import {Statutdto} from "../statut-courrier";

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
    structureDepotId?: number;
    structureDestinationId?: number;
    numeroDepeche?: string;
    date?:string;
    userId?:number;
    idstatutCourrier :number;
    fermetureCourriers: Fermeturecourrierdto[] ;  // Doit contenir des objets avec courrierId
}
