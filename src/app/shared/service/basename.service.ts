import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from 'src/app/global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseNameService {

  private baseUrl = this.global.baseUrl + '/api/base-name/';
  private getAllUrl = this.baseUrl + 'get-all/';
  private saveUrl = this.baseUrl + 'save';
  private getItemUrl = this.baseUrl + 'get-item/';
  private deleteUrl = this.baseUrl + 'delete/';
  private getByNameUrl = this.baseUrl + 'getByName/';

  constructor(private http: HttpClient, private global: Global) { }

  getAll(type: string): Observable<any> {
    return this.http.get<any>(this.getAllUrl + type);
  }

  save(item: any): Observable<any> {
    return this.http.post<any>(this.saveUrl, item);
  }

  getItem(id: string): Observable<any> {
    return this.http.get<any>(this.getItemUrl + id);
  }

  delete(type: string, id: string): Observable<any> {
    return this.http.delete(this.deleteUrl + type + '/' + id);
  }
  getByName(type: string, name: string): Observable<any> {
    return this.http.get(this.getByNameUrl + type + '/' + name);
  }
}
