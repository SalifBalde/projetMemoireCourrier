
export interface UserDto {
    id?: string;
    matricule?: string;
    nom?: string;
    prenom?: string;
    structureId?: string;
    caisseId?: string;
    caisseLibelle?: string;
    structureLibelle?: string;
    structureDrpLibelle?: string;
    structureCode?: string;
    email?:string;
    active?: boolean;
}

export interface StructureLookupDto {
    id?: string;
    libelle?: string;

}
