import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from 'src/app/global';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService implements BaseService {

  private baseUrl = this.global.baseUrl + '/api';
  constructor(private http: HttpClient, private global: Global) { }

  save(t: any, url: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + url, t);
  }
  getItem(url: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + url);
  }
  getAll(url: string): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + url);
  }
  delete(url: string): Observable<any> {
    return this.http.delete(this.baseUrl + url);
  }
  public saveImage(image: Blob, url: string, id: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('id', id);
    return this.http.post<any>(this.baseUrl + url, formData);
  }

}
