import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Scheme } from './../interface/scheme';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SchemeInfo } from '../interface/scheme-info';

@Injectable({
  providedIn: 'root'
})
export class SchemeService {

  private apiUrl: string = environment.baseUrl + 'api/scheme';

  activeSchemeList: SchemeInfo[] = [];
  upcomingSchemeList: SchemeInfo[] = [];
  pastSchemeList: SchemeInfo[] = [];

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

  loadAllActiveScheme(): Promise<SchemeInfo[]> {
    return this.httpClient.get<SchemeInfo[]>( this.apiUrl + "/active").toPromise();
  }
  loadAllConcludedScheme(): Promise<SchemeInfo[]> {
    return this.httpClient.get<SchemeInfo[]>( this.apiUrl + "/concluded").toPromise();

  }
  loadAllUpComingScheme(): Promise<SchemeInfo[]> {
    return this.httpClient.get<SchemeInfo[]>(this.apiUrl + "/upcoming").toPromise();
  }

  getSchemeById(id: string): Observable<Scheme> {
    return this.httpClient.get<Scheme>(this.apiUrl + '/' +id);
  }

  deleteScheme(id: string): Observable<Scheme> {
    return this.httpClient.delete<Scheme>(this.apiUrl + '/' + id).pipe(tap(() => {
      this.refreshNeeded.next();
    }));
  }

  updateScheme(schemeObj: Scheme): Observable<Scheme> {
    return this.httpClient.put<Scheme>(this.apiUrl, schemeObj).pipe(tap(() => {
      this.refreshNeeded.next();
    }));
  } 

}
