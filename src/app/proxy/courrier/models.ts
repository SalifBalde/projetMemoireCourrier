
export interface CourrierDto {
    numero:number;
    expediteur?: string;
    destinataire?: number;
    codeVignette:string;
    montant?: number;
    poids?: number;
    pays?: string;
    valeurDeclarer?: string;


}
