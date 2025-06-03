import {RegimeDto} from "../regime";
import {TypeCategorieDto} from "../type-categorie/models";

export interface ServicesDto {
  id?: string;
  libelle?: string;
  regimeId?: RegimeDto;
  serviceId?: ServicesDto;
  typeCategorieId?:TypeCategorieDto ;

}
