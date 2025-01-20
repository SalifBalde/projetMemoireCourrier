import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Fermeturecourrierdto} from "./models";
import {CourrierDto} from "../courrier";

@Injectable({
    providedIn: 'root',
})

export  class FermetureCourrierService {
    private api_host = `${environment.api_host}fermetureCourrier`;
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

    // Méthode pour récupérer les FermetureCourrier par fermetureId
    getFermetureCourriersByFermetureId(fermetureId: number): Observable<any[]> {
        return this.httpClient.get<any[]>(this.api_host+'/fermetureCourriers/'+fermetureId);
    }
    // Méthode pour récupérer les FermetureCourrier par fermetureId et statutId
          getCourriersByFermetureIdAndStatut(fermetureId: number, statutId:number): Observable<any[]> {
        return this.httpClient.get<any[]>(this.api_host+'/'+fermetureId+'/courriers/'+statutId);
    }

    getCourriersByFermetureIdAndStatutAndPaysOrigin(fermetureId: number, statutId:number,paysOrigineId:number,structureDestna:number): Observable<any[]> {
        return this.httpClient.get<any[]>(this.api_host+'/'+fermetureId+'/courriersByFermeture/'+statutId+'/'+paysOrigineId+'/'+structureDestna);
    }
}
