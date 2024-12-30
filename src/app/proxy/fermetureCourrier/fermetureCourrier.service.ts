import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Fermeturecourrierdto} from "./models";

@Injectable({
    providedIn: 'root',
})

export  class FermetureCourrierService {
    private api_host = `${environment.api_host}client`;
    myToken = sessionStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            "Authorization" : "Bearer "+this.myToken
        })
    }

    constructor(private readonly httpClient : HttpClient) { }



    findAll(): Observable<Fermeturecourrierdto[]> {
        return this.httpClient.get<Fermeturecourrierdto[]>(environment.api_host+'pays', this.httpOptions);
    }
}
