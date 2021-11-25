import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import Data from '../../../assets/mock-data/data.json'

@Injectable()
export class DataInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === "GET" && request.url === environment.baseUrl + 'data') {
      return of (new HttpResponse({ status: 200, body: Data }));
    }
    if (request.method === "POST" && request.url === environment.baseUrl + 'save') {
      return of (new HttpResponse({ status: 200 }));
    }
    return next.handle(request);
  }
}
