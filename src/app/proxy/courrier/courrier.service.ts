import { environment } from 'src/environments/environment';
import type { CourrierCreateUpdateDto, CourrierDto, CourrierSearchDto } from './models';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { ClientDto } from '../client';
import {BehaviorSubject, Observable} from "rxjs";
import {TypeCourrierDto} from "../type-courrier";
import {Statutdto} from "../statut-courrier";

@Injectable({
  providedIn: 'root',
})
export class CourrierService {
  apiName = 'courrier';
  private api_host: string = environment.api_host + this.apiName;
  myToken = sessionStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // "Authorization": "Bearer " + this.myToken
    })
  }

  constructor(private readonly httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<[CourrierDto]>(this.api_host, this.httpOptions);
  }

getAllDestinataires(clientId:string, destinationId:string) {
    let new_api_host = this.routerParam(this.api_host,'client',clientId,'destination', destinationId);
  return this.httpClient.get<ClientDto[]>(new_api_host,this.httpOptions);
}
  save(item: CourrierCreateUpdateDto)
{
  return this.httpClient.post(this.api_host,item,this.httpOptions);
}
saveReceptionCourrier(item: CourrierCreateUpdateDto)
{
  return this.httpClient.post(this.api_host+'/saverReception',item,this.httpOptions);
}

savePaquet(item: CourrierCreateUpdateDto)
{
  return this.httpClient.post(this.api_host+'/savecourrier',item,this.httpOptions);
}

delete(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.delete(new_api_host,this.httpOptions);
}

update(id:string, item:CourrierDto)
{
  let new_api_host = this.routerParam(this.api_host,);
  return this.httpClient.put<CourrierDto>(new_api_host+id,item,this.httpOptions);
}
getByCodeBarre(codeBarre: string): Observable<any> {
        return this.httpClient.get<any>(`${this.api_host}/findByCodeBarre/${codeBarre}`);
    }


livraison(id:string, item:CourrierDto)
{
  let new_api_host = this.routerParam(this.api_host,'livraison',id);
  return this.httpClient.put<CourrierDto>(new_api_host,item,this.httpOptions);
}
// Méthode pour mettre à jour plusieurs courriers


    findCourrierByAgent(search: CourrierSearchDto) {
      let new_api_host = this.routerParam(this.api_host, 'searchByAgent');
      return this.httpClient.post<CourrierDto[]>(new_api_host, search, this.httpOptions);
    }


    updateCourrier(courriers: CourrierDto[]): Observable<CourrierDto[]> {
        const url = `${environment.api_host}courrier/updatetaxeDouanier`;
        return this.httpClient.put<CourrierDto[]>(url, courriers,this.httpOptions);
    }
getOneById(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.get<CourrierDto>(new_api_host,this.httpOptions);
}

  updateCourriers(courriers: CourrierDto[]): Observable<CourrierDto[]> {
    const url = `${environment.api_host}courrier/update`;
    return this.httpClient.put<CourrierDto[]>(url, courriers, this.httpOptions);
  }



  findCourrierByCriteres(search: CourrierSearchDto) {
    const new_api_host = this.routerParam(this.api_host, 'search-by-criteria');
    return this.httpClient.post<CourrierDto[]>(new_api_host, search, this.httpOptions);
  }
  findCourrierByCriteresDcl(search: CourrierSearchDto) {
    const new_api_host = this.routerParam(this.api_host, 'search-by-criteriaDcl');
    return this.httpClient.post<CourrierDto[]>(new_api_host, search, this.httpOptions);
  }

  getOne(id: string) {
    let new_api_host = this.routerParam(this.api_host + '/getByreference', id);
    return this.httpClient.get<CourrierDto>(new_api_host, this.httpOptions);
  }

  annulerCourrier(id:string){
    const url = `${this.api_host}/annulerCourrier/${id}`;
    return this.httpClient.put<CourrierDto[]>(url, this.httpOptions);
   }


  findCourrierByStrutureDepot(idStrut: string) {
    return this.httpClient.get<[CourrierDto]>(this.api_host + '/structureDepot/' + idStrut, this.httpOptions);
  }

  findCourrierByTypeCourrierAndStructureDepotAndIdStut(idType: string, idStructureDepot: string, idStatut: string) {
    let new_api_host = this.routerParam(this.api_host,'by-type', idType, idStructureDepot, idStatut);
    return this.httpClient.get<[CourrierDto]>(new_api_host, this.httpOptions);
  }

    findCourrierByStrutureDepotAndStatutId(idStrut: string, idStatutCourrier: string)
    {
        return this.httpClient.get<[CourrierDto]>(this.api_host+'/byStructureDestinationAndStatut/'+idStrut+'/'+idStatutCourrier,this.httpOptions);
    }
    findCourrierByStrutureDestinationAndStatutIdAndTypeCourrier(idStrut: string, idStatutCourrier: string , typeCourrierId: string)
    {
        return this.httpClient.get<[CourrierDto]>(this.api_host+'/byStructureDestinationAndStatutandTypeCourrier/'+idStrut+'/'+idStatutCourrier+'/'+typeCourrierId,this.httpOptions);
    }

    findCourrierByStructureDepotAndStatutIds(structureId: string,idtypeCourrier:number, statutIds: number[]): Observable<CourrierDto[]> {
        const params = {
            structureId: structureId,
            idtypeCourrier,
            statutIds: statutIds.join(','),  // Transforme le tableau de nombres en chaîne séparée par des virgules
        };
        return this.httpClient.get<CourrierDto[]>(this.api_host+'/courriers', {params });
    }
    findCourrierByStructureDepotAndStatutIdsAndPaysOrigi(structureId: number,idtypeCourrier:number, statutIds: number,paysOrigineId: number): Observable<CourrierDto[]> {
        const params = {
            structureId: structureId,
            idtypeCourrier,
            paysOrigineId:paysOrigineId,
            statutIds: statutIds,
        };
        return this.httpClient.get<CourrierDto[]>(this.api_host+'/courriersInterieur', {params });
    }

    findByStructureDestinationIdAndStatutCourrierIdAndTypeCourrierIdIn(structureDestinationId: string,  typeCourrierIds: number[],idStatutCourrier: number): Observable<CourrierDto[]> {
        const params ={
            structureId:structureDestinationId,
           typeCourrierIds: typeCourrierIds.join(','),
            idStatutCourrier
        }

        return this.httpClient.get<CourrierDto[]>(`${this.api_host}/searchCourriersImport`, { params });
    }

    private routerParam(baseUrl: string, ...params: string[]) {
        return `${baseUrl}/${params.join('/')}`;
      }






}
