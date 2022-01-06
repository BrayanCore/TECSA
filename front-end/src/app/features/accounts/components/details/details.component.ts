import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';
import { Customer } from '../../models/customer.model';
import { Transaction } from '../../models/transaction.model';
import { AccountService } from '../../services/account.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  customer: Customer = new Customer();
  transactions: Transaction[] = [];
  deposits: Transaction[] = [];
  withdrawals: Transaction[] = [];

  constructor(
    private _accountService: AccountService,
    private _authService: AuthService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const id = this._route.snapshot.paramMap.get('id');
    if(id) {
      this.customer._id = id;
      this.getCustomers();
    }

  }

  getCustomers() {

    this._accountService.allCustomers().subscribe(
      (data: Customer[]) => {
        console.log(data);
        this.customer = data.find(customer => customer._id === this.customer._id) || new Customer();
        console.log(this.customer);
        if(this.customer._id) {
          this.getTransactions();
        } else {
          console.log('User not found');
          this.transactions = [];
        }
      }, (error) => {
        console.log(error);
      }
    );

  }

  getTransactions() {

    this._accountService.allTransactions().subscribe(
      (data) => {
        console.log(data);
        this.transactions = data;
        this.transactions = this.transactions.filter( operation => operation.numeroCuenta === this.customer._id );
        console.log('TRANSACCIONES DEL CLIENTE', this.transactions);
        this.deposits = this.transactions.filter( transaction => transaction.tipo === 'Deposito' );
        this.withdrawals = this.transactions.filter( transaction => transaction.tipo === 'Retiro' );
      }, (error) => {
        console.log(error);
        Swal.fire({
          title: 'Ooopsss..',
          text: 'Ocurrio un error, por favor intentalo mas tarde',
          icon: 'error',
        });
        this._authService.loggOut();
      }
    );

  }

}
