import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { map, Observable, startWith } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { Customer } from '../../models/customer.model';
import { SavingAccount } from '../../models/saving-account.model';
import { AccountService } from '../../services/account.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-savings-accounts',
  templateUrl: './register-savings-accounts.component.html',
  styleUrls: ['./register-savings-accounts.component.scss']
})
export class RegisterSavingsAccountsComponent implements OnInit {

  customer: Customer = new Customer();

  savingsAccounts: SavingAccount[] = [];

  myControl = new FormControl();
  options: Customer[] = [];
  filteredOptions!: Observable<Customer[]>;

  constructor(
    private _authService: AuthService,
    private _accountService: AccountService,

    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );

    this.getSavingsAccounts();

    this._accountService.allCustomers().subscribe(
      (data) => { 
        console.log(data);
        this.options = data;
        this.refreshAtucomplete();
      },
      (error) => { console.log(error) }
    );

  }

  private _filter(value: string): Customer[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  refreshAtucomplete() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  displayFn(customer: Customer): string {
    return customer && customer.name ? customer.name : '';
  }

  customerSelected(event: any) {

    this.customer = event.option.value;
    console.log(this.customer);

  }

  createSavingAccount() {

    let currentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');

    this._accountService.createSavingAccount(
      { 
        estado: 'Activa',
        fechaUltimaAct: currentDate ? currentDate : '2021-11-29',
        idCliente: ((this.savingsAccounts.length)+(1)),
        numeroCuenta: this.customer._id,
        saldo: 0.0
      }
    ).subscribe(
      (res) => {

        this.getSavingsAccounts();

        Swal.fire({
          title: 'Operacion realizada',
          text: 'Cuenta de ahorro creada exitosamente!',
          icon: 'success',
        });

        this.myControl.setValue('');
        this.customer = new Customer();

      }, (error) => {
        console.log(error);
        Swal.fire({
          title: 'Ooopsss..',
          text: 'Ocurrio un error, por favor intentalo mas tarde',
          icon: 'error',
        });
      }
    );

  }

  getSavingsAccounts() {

    this._accountService.allSavingAccounts().subscribe(
      (data) => { 
        this.savingsAccounts = data;
        console.log(this.savingsAccounts);
      },
      (error) => { 
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
