import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSavingsAccountsComponent } from './register-savings-accounts.component';

describe('RegisterSavingsAccountsComponent', () => {
  let component: RegisterSavingsAccountsComponent;
  let fixture: ComponentFixture<RegisterSavingsAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSavingsAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSavingsAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
