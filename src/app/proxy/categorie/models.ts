import {RegimeDto} from "../regime";
import {TypeCourrierDto} from "../type-courrier";

export interface CategorieDto {
  id?: string;
  libelle?: string;
  regimeId?: number ;
  typeCourrierId?: number;
}

export interface CategorieCreateUpdateDto {
    id?: string;
  libelle?: string;
  regimeId?: number ;
  regimeLibelle?: string ;
  typeCourrierId?: number;
  typeCourrierLibelle?: string;
  }
