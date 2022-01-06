import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private _authService: AuthService
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const tokenizeReq = req.clone({
        setHeaders: {
          Authorization: `${this._authService.getToken()}`
          // Authorization: `Bearer ${this._authService.getToken()}`
        }
      });

      return next.handle(this._authService.getToken() ? tokenizeReq : req);
  }

}
