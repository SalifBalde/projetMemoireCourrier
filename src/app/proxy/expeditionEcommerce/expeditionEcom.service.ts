import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExpeditionEcomCreateDto, ExpeditionEcomDto } from './models';  // Définir les DTOs selon les besoins

@Injectable({
  providedIn: 'root',
})
export class ExpeditionEcomService {
  private apiName = 'expedition_ecom';
  private api_host: string = environment.api_ecom + this.apiName;
  private myToken = sessionStorage.getItem('token');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.myToken}`,
    }),
  };

  constructor(private readonly httpClient: HttpClient) {}

  findAll(): Observable<ExpeditionEcomDto[]> {
    return this.httpClient.get<ExpeditionEcomDto[]>(this.api_host, this.httpOptions);
  }

  getOne(id: string): Observable<ExpeditionEcomDto> {
    let new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.get<ExpeditionEcomDto>(new_api_host, this.httpOptions);
  }

  save(item: ExpeditionEcomCreateDto): Observable<ExpeditionEcomDto> {
    return this.httpClient.post<ExpeditionEcomDto>(this.api_host, item, this.httpOptions);
  }

  update(id: string, item: ExpeditionEcomDto): Observable<ExpeditionEcomDto> {
    let new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.put<ExpeditionEcomDto>(new_api_host, item, this.httpOptions);
  }

  delete(id: string): Observable<void> {
    let new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.delete<void>(new_api_host, this.httpOptions);
  }

  updateExpeditions(expeditions: ExpeditionEcomDto[]): Observable<ExpeditionEcomDto[]> {
    const url = `${environment.api_host}expedition_ecom/update`;
    return this.httpClient.put<ExpeditionEcomDto[]>(url, expeditions, this.httpOptions);
  }

  private routerParam(baseUrl: string, ...params: string[]): string {
    return `${baseUrl}/${params.join('/')}`;
  }

  findExpeditionByStructureAndStatus(idStructure: string, idStatut: string): Observable<ExpeditionEcomDto[]> {
    let new_api_host = this.routerParam(this.api_host, 'structure', idStructure, 'statut', idStatut);
    return this.httpClient.get<ExpeditionEcomDto[]>(new_api_host, this.httpOptions);
  }
}
