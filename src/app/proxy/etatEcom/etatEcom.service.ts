import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EtatEcomDto } from "./models";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})

export class EtatEcomService {
    apiName = 'etat_ecom';
    private api_host: string = environment.api_ecom + this.apiName;
    myToken = sessionStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.myToken,
        }),
    };

    constructor(private readonly httpClient: HttpClient) { }

    findAll(): Observable<EtatEcomDto[]> {
        return this.httpClient.get<EtatEcomDto[]>(this.api_host, this.httpOptions);
    }
}
