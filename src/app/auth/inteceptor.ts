import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import {TokenStorage} from './token.storage';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';

const TOKEN_HEADER_KEY = 'Authorization';


@Injectable()
export class Interceptor implements HttpInterceptor {
  company = sessionStorage.getItem('COMPANY');
  constructor(private token: TokenStorage, private router: Router, private notification: NzNotificationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    let authReq = req;
    if (this.token.getToken() != null) {
      authReq = req.clone({ headers: req.headers
        .set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())
        .set('Company', this.company === null ? '' : this.company)
    });

    }
    return next.handle(authReq).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.notification.error(
                'Unathorized Access',
                'Access Denied, Incorrect Username/Password',
              );
              this.router.navigate(['/login']);
            } else if (err.status === 400) {
              this.notification.error(
                'Bad Request',
                'Error: Encounted a Bad Request',
              );
            } else if (err.status === 404) {
              this.notification.error(
                'Error 404',
                'Resource not found',
              );
            } else if (err.status === 403) {
              console.log('Forbidden');
            } else {
              console.log('Err Unknown');
            }
            return throwError(err);
          }
        })
      );

  }

}
