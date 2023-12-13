import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendemailforgotpasswordComponent } from './sendemailforgotpassword.component';

describe('SendemailforgotpasswordComponent', () => {
  let component: SendemailforgotpasswordComponent;
  let fixture: ComponentFixture<SendemailforgotpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendemailforgotpasswordComponent]
    });
    fixture = TestBed.createComponent(SendemailforgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
