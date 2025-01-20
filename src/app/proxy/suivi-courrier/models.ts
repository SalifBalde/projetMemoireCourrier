import {TypeCategorieDto} from "../type-categorie";
import {RegimeDto} from "../regime";

export interface CreateUpdateSuiviCourrierDto {
    id?: string;
    structureDepotId?: number;
    structureDestinationId?:number;
    userId?:number;
    idstatutCourrier?:number;

    courrierId?:number;

}

export interface SuiviCourrierDto {
    id?: string;
    structureDepotId?: number;
    structureDestinationId?:number;
    userId?:number;
    idstatutCourrier?:number;
    courrierId?:number;
}
