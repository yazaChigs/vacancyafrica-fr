import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from 'src/app/global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = this.global.baseUrl + '/api/user/';
  private getAllUrl = this.baseUrl + 'get-all';
  private saveUrl = this.baseUrl + 'save';
  private getItemUrl = this.baseUrl + 'get-item';
  private deleteUrl = this.baseUrl + 'delete/';

  constructor(private http: HttpClient, private global: Global) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.getAllUrl);
  }

  save(item: any): Observable<any> {
    return this.http.post<any>(this.saveUrl, item);
  }

  getItem(id: string): Observable<any> {
    return this.http.get<any>(this.getItemUrl + id);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.deleteUrl + id);
  }
}
