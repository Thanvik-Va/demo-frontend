import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { Credentails } from 'src/app/credentails';
import { ForgotpasswordService } from 'src/app/services/forgotpassword.service';
import { LoginServiceService } from 'src/app/services/login-service.service';




@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  token: string = '';
  statusCode: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private passwordservice: ForgotpasswordService,
    private service:LoginServiceService,
    private router: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log('Token from URL:', this.token);
    });
  }

  public forgotPasswordForm = this.fb.group({
    password: this.fb.control('', [Validators.required]),
    confirmPassword: this.fb.control('', [Validators.required])
  });

  get Password(): FormControl {
    return this.forgotPasswordForm.get('password') as FormControl;
  }

  get ConfirmPassword(): FormControl {
    return this.forgotPasswordForm.get('confirmPassword') as FormControl;
  }

  confirmPasswordMismatch(): boolean {
    const password = this.forgotPasswordForm.get('password')?.value;
    const confirmPassword = this.forgotPasswordForm.get('confirmPassword')?.value;
    return password !== confirmPassword && this.forgotPasswordForm.dirty;
  }

  submitForm() {
    if (this.forgotPasswordForm.valid && !this.confirmPasswordMismatch()) {
      const password = this.forgotPasswordForm.value.password;
      console.log('In Component ' + this.token + ' ' + password);
      this.passwordservice.sendPasswordDetails(this.token, password).subscribe(
        data => {
          console.log(data);
          this.statusCode=data.statusCode;
          setTimeout(() => {
            // Your code to be executed after the delay
           
          }, 3000);
          this.toastr.success('Password Changed Succeffully', ``, {
            positionClass: 'toast-top-right',
          });
          this.doNavigating();
        },
        err => {
          console.log(err);
          this.toastr.error('Something went wrong', ``, {
            positionClass: 'toast-top-right',
          });
        }
      );
    }
  }
  doNavigating(): void {
    if (this.statusCode == 0) {
      //localStorage.setItem('token', this.token)
     // console.log(localStorage.getItem('token'));

     //
      //this.authServ.logIn();
      this.service.isAuthenticated=true;

      if(this.service.isAuthenticatedUser()){
        this.router.navigate(['/login']);
      }
      else{
        this.router.navigate(['']);
      }
     
    }
    console.log('hi')
   

}
}
  // message() {
  //   alert("A password verification message has been sent to your email...")
  // }

