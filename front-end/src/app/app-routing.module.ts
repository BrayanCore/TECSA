import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { CreateComponent } from './features/accounts/components/create/create.component';
import { DetailsComponent } from './features/accounts/components/details/details.component';
import { RegisterSavingsAccountsComponent } from './features/accounts/components/register-savings-accounts/register-savings-accounts.component';
import { TransactionsComponent } from './features/accounts/components/transactions/transactions.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-customer',
    component: CreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-savings-accounts',
    component: RegisterSavingsAccountsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accounts/:id',
    component: DetailsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
