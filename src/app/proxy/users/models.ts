export interface CreateUpdateUserDto {
    id?: string;
    matricule?: string;
    nom?: string;
    prenom?: string;
    departementId?: string;
    email?:string;
    active?: boolean;
}

export interface UserDto {
    id?: string;
    matricule?: string;
    nom?: string;
    prenom?: string;
    structureId?: string;
    caisseId?: string;
    structureLibelle?: string;
    email?:string;
    active?: boolean;
}

export interface StructureLookupDto {
    id?: string;
    libelle?: string;

}
