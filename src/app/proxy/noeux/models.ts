import {Fermeturecourrierdto} from "../fermetureCourrier";
import {Statutdto} from "../statut-courrier";

export  interface NoeuxUpdatedto{
   id?: number;
    structureId?: number;
    libelle?: string;
}



export interface Noeuxdto {
    id?: number;
    structureId?: number;
    libelle?: string; // Doit contenir des objets avec courrierId
}
