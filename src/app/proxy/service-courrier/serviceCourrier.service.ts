import { environment } from 'src/environments/environment';
import type { CreateUpdateServiceCourrierDto, ServiceCourrierDto } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { TypeCategorieDto } from "../type-categorie";
import { RegimeDto } from "../regime";

@Injectable({
    providedIn: 'root',
})
export class ServiceCourrierService {
    apiName = 'serviceCourrier';
    private api_host: string = environment.api_host + this.apiName;
    myToken = sessionStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + this.myToken
        })
    }
    constructor(private readonly httpClient: HttpClient) { }

    findAll() {
        return this.httpClient.get<[ServiceCourrierDto]>(this.api_host, this.httpOptions);
    }

    save(item: ServiceCourrierDto) {
        return this.httpClient.post(this.api_host, item, this.httpOptions);
    }
    delete(id: string) {
        let new_api_host = this.routerParam(this.api_host, id);
        return this.httpClient.delete(new_api_host, this.httpOptions);
    }
    update(id: string, item: ServiceCourrierDto) {
        let new_api_host = this.routerParam(this.api_host, id);
        return this.httpClient.put<ServiceCourrierDto>(new_api_host, item, this.httpOptions);
    }

    getOneById(id: string) {
        let new_api_host = this.routerParam(this.api_host, id);
        return this.httpClient.get<ServiceCourrierDto>(new_api_host, this.httpOptions);
    }
    getRegimes(regimeId: string) {
        let new_api_host = this.routerParam(this.api_host, regimeId);
        return this.httpClient.get<RegimeDto[]>(new_api_host, this.httpOptions);
    }

    getTypeCategories(typeCategorieId: string) {
        let new_api_host = this.routerParam(this.api_host, typeCategorieId);
        return this.httpClient.get<TypeCategorieDto[]>(new_api_host, this.httpOptions);
    }
    getOne(id: string) {
        let new_api_host = this.routerParam(this.api_host + '/getByreference', id);
        return this.httpClient.get<ServiceCourrierDto>(new_api_host, this.httpOptions);
    }

    routerParam(host: string, param: string) {
        return host + "/" + param;
    }
}
