import {Regimedto} from "../regime";
import {TypeCatgorieDto} from "../type-categorie/models";

export interface ServicesDto {
  id?: string;
  libelle?: string;
  regimeId?: Regimedto;
  typeCategorieId?:TypeCatgorieDto ;

}
