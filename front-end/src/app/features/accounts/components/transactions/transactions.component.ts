import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { map, Observable, startWith } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { SavingAccount } from '../../models/saving-account.model';
import { AccountService } from '../../services/account.service';

import Swal from 'sweetalert2';

interface SavingAccountWithIdString {
  idCliente: string;
  numeroCuenta: string;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  operationForm = new FormGroup({
    fechaUltimaAct: new FormControl(null),
    monto: new FormControl(null, Validators.required),
    numeroCuenta: new FormControl(null, Validators.required),
    tipo: new FormControl("Deposito", Validators.required),
    terminal: new FormControl("TERM235"),
    usuario: new FormControl("u-231"),
  });

  savingsAccounts: SavingAccount[] = [];
  savingsAccounts2: SavingAccountWithIdString[] = [];

  myControl = new FormControl();
  filteredOptions!: Observable<SavingAccountWithIdString[]>;

  selectedFood = 'Deposito';

  constructor(
    private _accountService: AccountService,
    private _authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.savingsAccounts2.slice())),
    );

    this._accountService.allTransactions().subscribe(
      (data) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      }
    );

    this.getSavingsAccounts();

  }

  private _filter(value: string): SavingAccountWithIdString[] {
    const filterValue = value.toLowerCase();
    return this.savingsAccounts2.filter(option => option.idCliente.toLowerCase().includes(filterValue));
  }

  displayFn(account: SavingAccountWithIdString): string {
    return account && account.idCliente ? account.idCliente : '';
  }

  refreshAutocomplete() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.savingsAccounts2.slice())),
    );
  }

  get form(): { [key: string]: AbstractControl } {
    return this.operationForm.controls;
  }

  getSavingsAccounts() {

    this._accountService.allSavingAccounts().subscribe(
      (data) => { 
        this.savingsAccounts = data;
        this.savingsAccounts.forEach( account => {
          this.savingsAccounts2.push({
            idCliente: account.idCliente.toString(),
            numeroCuenta: account.numeroCuenta,
          });
        } );
        this.refreshAutocomplete();
        console.log(this.savingsAccounts);
        console.log(this.savingsAccounts2);
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

  accountSelected(event: MatAutocompleteSelectedEvent) {

    console.log(event.option.value);
    this.form['numeroCuenta'].setValue(event.option.value.numeroCuenta);

  }

  executeOperation() {

    this.form['fechaUltimaAct'].setValue(new Date().toISOString());

    this._accountService.createTransaction(this.operationForm.getRawValue()).subscribe(
      (res) => {

        console.log(res);
        Swal.fire({
          title: 'Operacion realizada',
          text: 'Transaccion ejecutada exitosamente!',
          icon: 'success',
        });

        this.myControl.setValue('');
        this.clearForm();
        console.log(this.operationForm);

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

  clearForm(): void {

    this.form['fechaUltimaAct'].setValue(null);
    this.form['monto'].setValue(null);
    this.form['numeroCuenta'].setValue(null);    
    this.form['tipo'].setValue('Deposito');
    
  }

}
