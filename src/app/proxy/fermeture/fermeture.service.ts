import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Fermeturedto, FermetureSearchDto} from "./models";
import type {CourrierSearchDto} from "../courrier";

@Injectable({
    providedIn: 'root',
})

export  class FermetureService {
    private api_host = `${environment.api_host}fermeture`;
    myToken = sessionStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            "Authorization" : "Bearer "+this.myToken
        })
    }

    constructor(private readonly httpClient : HttpClient) { }



    findAll(): Observable<Fermeturedto[]> {
        return this.httpClient.get<Fermeturedto[]>(environment.api_host+'pays', this.httpOptions);
    }

    findById(id:number): Observable<Fermeturedto> {
        return this.httpClient.get<Fermeturedto>(environment.api_host+'fermeture/'+id, this.httpOptions);
    }

    saveFermeture(fermeture : Fermeturedto): Observable<any> {
        return this.httpClient.post<any>(environment.api_host+'fermeture',fermeture, this.httpOptions);
    }
    saveFermetureImport(fermeture : Fermeturedto): Observable<any> {
        return this.httpClient.post<any>(environment.api_host+'fermeture/',fermeture, this.httpOptions);
    }

    getFermeturesByStructureDestination(structureId: string, idstatutCourrier:number, typeCourrierId:number): Observable<any[]> {
        return this.httpClient.get<any[]>(this.api_host+'/by-structure-destination/'+structureId+'/'+idstatutCourrier+'/'+typeCourrierId);
    }
    getFermeturesByCriteria(structureId: string, idstatutCourrier:number, typeCourrierId:number ): Observable<any[]> {
        return this.httpClient.get<any[]>(this.api_host+'/searchFermetureByCriteria/'+structureId+'/'+idstatutCourrier+'/'+typeCourrierId);
    }

    getRapport(search: FermetureSearchDto ): Observable<Fermeturedto[]> {
        return this.httpClient.post<Fermeturedto[]>(this.api_host+'/rapport',search, this.httpOptions);
    }

    private routerParam(baseUrl: string, ...params: string[]) {
        return `${baseUrl}/${params.join('/')}`;
      }

}
