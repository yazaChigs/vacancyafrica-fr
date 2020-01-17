import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Global } from '../global';

@Injectable({providedIn: 'root'})
export class FormService {
  private baseUrl = this.global.baseUrl + '/api/create-form/';
  private createFormUrl = this.baseUrl + 'create'
  private submitAnswersUrl = this.baseUrl + 'answers'
  private getFormByFormName = this.baseUrl + 'get/'
  private getAll = this.baseUrl + 'get-all'

  constructor(private http: HttpClient, private global: Global) { }

  public submit(item): Observable<any> {
    return this.http.post<any>(this.createFormUrl, item);
  }
  public submitAnswers(item): Observable<any> {
    return this.http.post<any>(this.submitAnswersUrl, item);
  }
  public getForm(item): Observable<any> {
    return this.http.get(this.getFormByFormName + item);
  }

  public getAllForms(): Observable<any> {
    return this.http.get(this.getAll);
  }


}
