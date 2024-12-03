import {TypeCategorieDto} from "../type-categorie";
import {RegimeDto} from "../regime";

export interface CreateUpdateServiceCourrierDto {
    id?: string;
    libelle?: string;
    typeCategorieId?:number;
    regimeId?:number;

}

export interface ServiceCourrierDto {
    id?: string;
    libelle?: string;
    typeCategorieId?:number;
    regimeId?:number;
}
