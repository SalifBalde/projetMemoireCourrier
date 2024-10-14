import { DistanceDto } from "../distances";
import { ProduitDto} from "../produits";


export interface DistanceLookupDto {
    libelle?: string;
  }
export interface ProduitLookupDto {
    id?: string;
    libelle?: string;
  }

export interface TarifProduitdCreateUpdateDto {
  id?: string;
  tarif?: number;
  distanceId?: string;
  produitId?: string;
}

export interface TarifProduitDto {
  id?: string;
  tarif?: number;
  distanceLibelle?: string;
  distanceId?:string
  produitLibelle?: string;
  produitId?:string;
}
