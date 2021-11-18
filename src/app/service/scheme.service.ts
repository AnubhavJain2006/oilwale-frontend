import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Scheme } from './../interface/scheme';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchemeService {

  apiUrl: string = environment.baseUrl + 'api/scheme';

  _refreshNeeded = new Subject<void>();

  get refreshNeeded() {
    return this._refreshNeeded;
  }
  constructor(private httpClient: HttpClient) { }

  addNewScheme(scheme: Scheme): Observable<any> {
    return this.httpClient.post(this.apiUrl, scheme).pipe(tap(() => {
      this._refreshNeeded.next()
    }))
  }

  loadAllActiveScheme(): Promise<any> {
    return this.httpClient.get( this.apiUrl + "/active").toPromise();
  }
  loadAllConcludedScheme() {
    return this.httpClient.get( this.apiUrl + "/concluded").toPromise();

  }
  loadAllUpComingScheme() {
    return this.httpClient.get(this.apiUrl + "/upcoming").toPromise();
  }

  getSchemeById(id: string): Observable<Scheme> {
    return this.httpClient.get<Scheme>(this.apiUrl + '/' +id);
  }

  deleteScheme(id: string): Observable<Scheme> {
    return this.httpClient.delete<Scheme>(this.apiUrl + '/' + id);
  }

  updateScheme(schemeObj: Scheme): Observable<Scheme> {
    return this.httpClient.put<Scheme>(this.apiUrl, schemeObj);
  } 

}
