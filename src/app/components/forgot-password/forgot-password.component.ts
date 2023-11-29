import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Credentails } from 'src/app/credentails';
import { LoginServiceService } from 'src/app/services/login-service.service';




@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {


  constructor(private service: LoginServiceService,
    private fb: FormBuilder) {

  }


  public forgotPasswordForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)]),
  });

  get Email(): FormControl {
    return this.forgotPasswordForm.get("email") as FormControl;
  }


  submitForm() {
    if (this.forgotPasswordForm.valid) {
      // const email  = this.forgotPasswordForm.get('email').value;
      // Handle the submission logic here (e.g., send request to reset password)

    }
  }

  message() {
    alert("A password verification message has been sent to your email...")


  }


}







