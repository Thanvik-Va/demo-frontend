import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credentails } from 'src/app/credentails';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { OrgServiceService } from 'src/app/services/services/org-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  email: string = '';
  password: string = '';
  hideLoginForm:boolean=true;
  token!: string;
  statusCode: number | null = null;
  errorCode: number | null = null; /*  Represents the error code from the login response. */
  message: string | null = null;

  loginError: string | null = null; /* Stores the specific login error message if encountered. */

  otpSubmitted: boolean = false;
  //FormBuilder service used to building the login form  
  //Router-> for the navigation 
  constructor(private service: LoginServiceService, private orgService: OrgServiceService, private router: Router,
    private fb: FormBuilder, private toastr:ToastrService) { }


  public loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)]),
    password: this.fb.control('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)])
    
  });

  public otpForm=this.fb.group({
    verifyOTP: this.fb.control('', [Validators.required, Validators.pattern(/^\d{6}$/)])
  })

  get Email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }

  get Password(): FormControl {

    return this.loginForm.get("password") as FormControl;
  }

  get VerifyOTP(): FormControl {
    return this.otpForm.get('verifyOTP') as FormControl;
  }



  /* Receives form data
   Invoke the login service using the provided data
   Handle the login response and errors
   Store the authenticaion token in local storage */

  emailForLogin:string|any=''
  formData:any;
  onSubmit(data: any): void {
    console.log(data);
    this.formData=data;
    this.service.login(data).subscribe(
      (response) => {
        console.log(response);
         
        this.errorCode = response.errorCode
 
        this.message = response.message
        this.statusCode = response.statusCode

        if(response.statusCode==0){
          this.emailForLogin=this.loginForm.value.email;
          localStorage.setItem('email',this.emailForLogin);
          this.otpSubmitted=true;
          this.hideLoginForm=false;
          this.toastr.success('', `otp sent to ${this.emailForLogin}`, {
            positionClass: 'toast-top-right',
          });

        }
        else {
          switch (this.errorCode) {
            case 8: this.loginError = "Authentication Error"; break;
            case 9: this.loginError = "Bad credentials"; break;
            case 10: this.loginError = "Password expired"; break;
            case 11: this.loginError = "Account Expired"; break;
            case 12: this.loginError = "Account De-activated"; break;
            case 13: this.loginError = "Account Locked"; break;
          }
        }
        //this.doNavigating();
      },
      (error) => {
        console.log("This is error block");
        console.log(error);
      }
    )
   

  }

  /* Method for otp verification*/
  verifyOTP()
  {
    this.service.sendOtp(this.otpForm.value.verifyOTP).subscribe(
      (response) => {
        console.log(response)
        localStorage.setItem('token',response.data.token);
        if(response.statusCode==0)
        {
          this.doNavigating();
        }
      
      },
      (error)=>{
        this.toastr.error('Invalid OTP','Pelase enter valid OTP', {
          positionClass: 'toast-top-right',
        });
      }
      
    
    )
  }

  // Resend OTP
  resendOTP()
  {
    this.otpForm.reset(); 
    this.onSubmit(this.formData);
  }

  /*Based on the recived response, navigate the user to
   the appropriate page or display relevant error */
  doNavigating(): void {
    if (this.statusCode == 0) {
      //localStorage.setItem('token', this.token)
     // console.log(localStorage.getItem('token'));

     //
      //this.authServ.logIn();
      this.service.isAuthenticated=true;

      if(this.service.isAuthenticatedUser()){
        this.router.navigate(['/layout/dashboard']);
      }
      else{
        this.router.navigate(['']);
      }
     
    }
   

  }
  clearError(){
    this.loginError='';
  }

}
