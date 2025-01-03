import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EcommerceDto, EcommerceSearchResultDto } from './models';// Assuming you have a model for EcommerceSearchResultDto

@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  apiName = 'ecommerce';
  private api_host: string = environment.api_ecom + this.apiName;
  myToken = sessionStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.myToken,
    }),
  };

  constructor(private readonly httpClient: HttpClient) {}

  getAllEcommerce(): Observable<EcommerceDto[]> {
    return this.httpClient.get<EcommerceDto[]>(this.api_host, this.httpOptions);
  }

  getEcommerceById(id: number): Observable<EcommerceDto> {
    return this.httpClient.get<EcommerceDto>(`${this.api_host}/${id}`, this.httpOptions);
  }

  getAllEcommerceByStatus(id: string, bureauId: number): Observable<EcommerceSearchResultDto[]> {
    return this.httpClient.post<EcommerceSearchResultDto[]>(`${this.api_host}/findEcommerceByStatus/${id}/${bureauId}`, this.httpOptions);
  }

  createEcommerce(ecommerce: EcommerceDto): Observable<EcommerceDto> {
    return this.httpClient.post<EcommerceDto>(this.api_host, ecommerce, this.httpOptions);
  }

  updateEcommerce(id: number, ecommerce: EcommerceDto): Observable<EcommerceDto> {
    return this.httpClient.put<EcommerceDto>(`${this.api_host}/${id}`, ecommerce, this.httpOptions);
  }

  deleteEcommerce(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.api_host}/${id}`, this.httpOptions);
  }
}
