import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Credentails } from 'src/app/credentails';
import { ForgotpasswordService } from 'src/app/services/forgotpassword.service';
import { LoginServiceService } from 'src/app/services/login-service.service';




@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  constructor(private service: LoginServiceService,
    private fb: FormBuilder, private route: ActivatedRoute, private passwordservice: ForgotpasswordService) {
  }
  token: string = ''
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log('Token from URL:', this.token);
    })
  }


  public forgotPasswordForm = this.fb.group({
    password: this.fb.control('', [Validators.required, Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)]),
  });

  get Password(): FormControl {
    return this.forgotPasswordForm.get("password") as FormControl;
  }
  submitForm() {
    console.log(this.forgotPasswordForm.value.password);
    // if (this.forgotPasswordForm.valid) {

      const password = this.forgotPasswordForm.value.password;
      console.log('In Component '+this.token+' '+ password);
      this.passwordservice.sendPasswordDetails(this.token, password).subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  // message() {
  //   alert("A password verification message has been sent to your email...")
  // }

