import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<object> {
    return this.httpClient.get(environment.baseUrl + 'data');
  }

  saveData(data): Observable<object> {
    return this.httpClient.post(environment.baseUrl + 'save', data);
  }
}
