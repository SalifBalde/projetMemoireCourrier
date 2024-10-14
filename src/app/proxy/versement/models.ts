export interface VersementDto {
    id: string; 
    colisId: string;
    numero: string;
    montant: number;
    verserPar: string;
    structureId: string;
    structureLibelle: string;
    caisseId: string;
  }
export interface VersementCreateUpdateDto {
    id:string; 
    colisId?: string;
    numero?: string; 
    montant?:number; 
    verserPar?: string;
    structureId?: string;
    structureLibelle?: string;
    caisseId?: string;
}
