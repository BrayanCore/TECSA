import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { TransactionsComponent } from './features/accounts/components/transactions/transactions.component';
import { RegisterSavingsAccountsComponent } from './features/accounts/components/register-savings-accounts/register-savings-accounts.component';
import { CreateComponent } from './features/accounts/components/create/create.component';

import { AuthGuard } from './core/guards/auth.guard';
import { TokenInterceptorService } from './core/interceptors/token-interceptor-service.service';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DatePipe } from '@angular/common';
import { DetailsComponent } from './features/accounts/components/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    TransactionsComponent,
    CreateComponent,
    RegisterSavingsAccountsComponent,
    DetailsComponent
  ],
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatAutocompleteModule,

    SweetAlert2Module,

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
