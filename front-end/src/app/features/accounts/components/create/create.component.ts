import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '../../services/account.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  genre = 'Masculino';

  customerForm = new FormGroup({});

  constructor(
    private _accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.customerForm = this.initForm();
  }

  get form(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  createCustomer() {

    this._accountService.create(this.customerForm.getRawValue()).subscribe(
      (res) => {

        console.log(res);

        this.customerForm = this.initForm();
        Swal.fire({
          title: 'Operacion realizada',
          text: 'Cliente creado correctamente!',
          icon: 'success',
        });

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

  initForm() : FormGroup {
    return new FormGroup({
      name: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      age: new FormControl(null, Validators.required),
      genre: new FormControl("Masculino", Validators.required),
    });
  }

}
