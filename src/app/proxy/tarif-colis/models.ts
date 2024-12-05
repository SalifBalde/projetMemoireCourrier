
export interface TarifCourrierCreateUpdateDto {
  id?: string;
  taxe?: number;
  zoneId?: string;
  poidsId?: string;
}

export interface TarifCourrierDto {
  id?: string;
  taxe?: number;
  zoneId?: string;
  zoneLibelle?: string;
  poidsId?: string;
  poidsLibelle?: string;
}
