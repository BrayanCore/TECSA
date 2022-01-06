import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { SavingAccountCreateDto } from '../dtos/saving-account-create.dto';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _environment = environment;

  constructor(
    private _http: HttpClient,
    private _authService: AuthService
  ) { }

  create(customer: any) {

    return this._http.post<any>(`${this._environment.localhost}/customers/create`, customer);

  }

  allSavingAccounts() {

    return this._http.get<any>(`${this._environment.getAccountsUrl}${this._authService.getToken()}`).pipe(
      map(
        res => {
          return this.removeKeys(res);
        }
      ), catchError( this.handleError )
    )

  }

  removeKeys(response: any): any[] {

    let arr: any[] = [];  
    Object.keys(response).map(function(key){  
        arr.push({[key]:response[key]})  
        return arr;  
    });  
    arr.forEach(
      (element, index) => {
        arr[index] = arr[index][`${Object.keys(arr[index])}`]
      }
    );
    return arr;

  }

  allCustomers() {

    return this._http.get<Customer[]>(`${this._environment.localhost}/customers`);

  }

  createSavingAccount(data: SavingAccountCreateDto) {

    return this._http.post<any>(`${this._environment.createSavingAccountUrl}${this._authService.getToken()}`, data);

  }

  createTransaction(transaction: CreateTransactionDto) {
    
    return this._http.post<any>(`${this._environment.createTransactionUrl}${this._authService.getToken()}`, transaction);
    
  }

  allTransactions() {

    return this._http.get<any>(`${this._environment.getTransactionsUrl}${this._authService.getToken()}`).pipe(
      map(
        res => {
          return this.removeKeys(res);
        }
      ), catchError( this.handleError )
    );

  }
  
  handleError(error: HttpErrorResponse): Observable<any[]> {

    console.log('There was an error');
    console.warn(error);
    return throwError([]);

  }

}
