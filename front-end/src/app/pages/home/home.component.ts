import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { SavingAccount } from 'src/app/features/accounts/models/saving-account.model';
import { Transaction } from 'src/app/features/accounts/models/transaction.model';
import { AccountService } from 'src/app/features/accounts/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  counterSavingsAccounts: number = 0;
  counterDeposits: number = 0;
  counterWithdrawals: number = 0;

  constructor(
    private _accountService: AccountService
  ) { }

  ngOnInit(): void {

    this._accountService.allTransactions().subscribe(
      (data: Transaction[]) => {
        console.log(data);
        this.counterDeposits = data.filter( transaction => moment().startOf('day').isSameOrBefore(new Date(transaction.fechaUltimaAct), 'milliseconds') && transaction.tipo === 'Deposito' ).length;
        this.counterWithdrawals = data.filter( transaction => moment().startOf('day').isSameOrBefore(new Date(transaction.fechaUltimaAct), 'milliseconds') && transaction.tipo === 'Retiro' ).length;
      }, (error) => {
        console.log(error);
      }
    );

    this._accountService.allSavingAccounts().subscribe(
      (data: SavingAccount[]) => {
        console.log(data);
        this.counterSavingsAccounts = data.filter( account => moment().startOf('day').isSameOrBefore(this.addHoursToDate(account.fechaUltimaAct, 6), 'milliseconds') ).length;
      }, (error) => {
        console.log(error);
      }
    );

  }

  // Function implemented because parsing date savings accounts, were wrong for 6 hours
  addHoursToDate(date: string, hours: number): Date {
    return new Date(new Date(date).setHours(new Date(date).getHours() + hours));
  }

}
