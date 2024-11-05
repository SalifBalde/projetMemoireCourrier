import {Regimedto} from "../regime";
import {TypeCourrierDto} from "../type-courrier";

export interface CategorieDto {
  id?: string;
  libelle?: string;
  regime?: Regimedto ;
  typeCourrier?: TypeCourrierDto;
}
