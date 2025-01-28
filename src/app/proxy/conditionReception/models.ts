import {Fermeturecourrierdto} from "../fermetureCourrier";
import {Statutdto} from "../statut-courrier";

export  interface ConditionUpdatedto{
   id?: number;
    libelle?: string;
}



export interface Conditiondto {
    id?: number;
    libelle?: string; // Doit contenir des objets avec courrierId
}
