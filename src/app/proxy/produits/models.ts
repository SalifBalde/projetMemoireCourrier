import Theme from "quill/core/theme";
import {TypeProduitDto} from "../type-produits";
import {ThemeDto} from "../themes";

export interface CreateUpdateProduitDto {
    id?: string;
    libelle?: string;
    codeBarre?:string;
    prix?:string;
    themeId?:number;
    typeProduitId?:number
    description?: string;
    active?: boolean;
}

export interface ProduitDto {
    id?: string;
    libelle?: string;
    codeBarre?:string;
    prix?:string;
    theme?:ThemeDto;
    typeProduit?:TypeProduitDto
    description?: string;
    active?: boolean;
}
