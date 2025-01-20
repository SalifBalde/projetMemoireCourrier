import {Fermeturecourrierdto} from "../fermetureCourrier";
import {Statutdto} from "../statut-courrier";
import {Noeuxdto} from "../noeux";

export  interface AcheminementUpdatedto{
   id?: number;
    structureId?: number;
    libelle?: string;
    iduser?: number;
    noeud?: Noeuxdto
}



export interface Acheminementdto {
    id?: number;
    structureId?: number;
    libelle?: string;
    iduser?: number;
    noeud?: Noeuxdto// Doit contenir des objets avec courrierId
}
