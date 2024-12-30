
export interface TarifServiceCreateUpdateDto {
    id?: string;
    taxe?: number;
    zoneId?: string;
    serviceId?: string;
  }

  export interface TarifServiceDto {
    id?: string;
    taxe?: number;
    zoneId?: string;
    zoneLibelle?: string;
    serviceId?: string;
    serviceLibelle?: string;
  }
