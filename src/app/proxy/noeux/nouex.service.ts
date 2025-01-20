import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Noeuxdto} from "./models";

@Injectable({
    providedIn: 'root',
})

export  class NouexService {
    private api_host = `${environment.api_host}noeux`;
    myToken = sessionStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            "Authorization" : "Bearer "+this.myToken
        })
    }

    constructor(private readonly httpClient : HttpClient) { }



    findAll(): Observable<Noeuxdto[]> {
        return this.httpClient.get<Noeuxdto[]>(this.api_host, this.httpOptions);
    }

    saveFermeture(noeux : Noeuxdto): Observable<any> {
        return this.httpClient.post<any>(this.api_host,noeux, this.httpOptions);
    }
    findById(idnoeud : number): Observable<Noeuxdto> {
        return this.httpClient.get<Noeuxdto>(this.api_host+'/'+idnoeud, this.httpOptions);
    }

    findNoeuxByIdstruct(idstruct : string): Observable<Noeuxdto> {
        return this.httpClient.get<Noeuxdto>(this.api_host+'/structure/'+idstruct, this.httpOptions);
    }
}
