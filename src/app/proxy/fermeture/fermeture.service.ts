import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Fermeturedto} from "./models";

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
        return this.httpClient.post<any>(environment.api_host+'fermeture/saveFermetureImport',fermeture, this.httpOptions);
    }

    getFermeturesByStructureDestination(structureId: string, idstatutCourrier:number, typeCourrierId:number): Observable<any[]> {
        return this.httpClient.get<any[]>(this.api_host+'/by-structure-destination/'+structureId+'/'+idstatutCourrier+'/'+typeCourrierId);
    }
    getFermeturesByCriteria(structureId: string, idstatutCourrier:number, typeCourrierId:number , paysOrigine: number): Observable<any[]> {
        return this.httpClient.get<any[]>(this.api_host+'/searchFermetureByCriteria/'+structureId+'/'+idstatutCourrier+'/'+typeCourrierId+'/'+paysOrigine);
    }

    getRapport(formattedDebut: string, formattedFin: string , structureId: number, userId: number ): Observable<Fermeturedto[]> {
        const params = new HttpParams()
            .set('startDate', formattedDebut)
            .set('endDate', formattedFin)
            .set('structureId',structureId)
            .set('userId', userId);
        return this.httpClient.get<Fermeturedto[]>(this.api_host+'/rapport', { params });
    }
}
