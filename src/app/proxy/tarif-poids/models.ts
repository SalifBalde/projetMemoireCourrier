import { DistanceDto } from "../distances";
import { PoidsDto } from "../poids";


export interface DistanceLookupDto {
    libelle?: string;
  }
export interface PoidsLookupDto {
    libelle?: string;
  }

export interface TarifPoidsCreateUpdateDto {
  id: string;
  tarif: number;
  distanceId: string;
  poidsId: string;
}

export interface TarifPoidsDto {
  libelle: string;
  id?: string;
  tarif?: number;
  distance?: DistanceDto;
  poids?: PoidsDto;
}
