import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  loggUser() {

    console.log(this.f);

    this._authService.loggIn(this.f['email'].value, this.f['password'].value).subscribe(
      (response) => {
        console.log(response);
        // localStorage.setItem('token', response.refreshToken);
        localStorage.setItem('token', response.idToken);
        this._router.navigate(['']);
      }, (error) => {
        console.log(error)
      }
    );

  }

}
