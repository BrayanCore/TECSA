import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface LogInDto {
  idToken: string,
  refreshToken: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _environment = environment;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  loggIn(email: string, password: string) {

    return this._http.post<LogInDto>(this._environment.authUrl, {
      'email': email,
      'password': password,
      "returnSecureToken": true
    });

  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggOut() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

}
