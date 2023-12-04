import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentails } from 'src/app/credentails';
import { AuthService } from 'src/app/services/auth.service';
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

  token!: string;
  statusCode: number | null = null;
  errorCode: number | null = null; /*  Represents the error code from the login response. */
  message: string | null = null;

  loginError: string | null = null; /* Stores the specific login error message if encountered. */


  //FormBuilder service used to building the login form  
  //Router-> for the navigation 
  constructor(private service: LoginServiceService, private orgService: OrgServiceService,private authServ: AuthService, private router: Router,
    private fb: FormBuilder) { }


  public loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)]),
    password: this.fb.control('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)])
  });

  get Email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }

  get Password(): FormControl {

    return this.loginForm.get("password") as FormControl;
  }



  /* Receives form data
   Invoke the login service using the provided data
   Handle the login response and errors
   Store the authenticaion token in local storage */

  onSubmit(data: any): void {
    console.log(data);
    this.service.login(data).subscribe(
      (response) => {
        console.log(response);
        this.token = response.data.token
        this.errorCode = response.errorCode
        this.message = response.message
        this.statusCode = response.statusCode

        localStorage.setItem('token', this.token);
        this.doNavigating();
      },
      (error) => {
        console.log("This is error block");
        console.log(error);
      }
    )
   

  }

  /*Based on the recived response, navigate the user to
   the appropriate page or display relevant error */
  doNavigating(): void {
    if (this.statusCode == 0 && this.token != null) {
      localStorage.setItem('token', this.token)
      console.log(localStorage.getItem('token'));

     //
      //this.authServ.logIn();
      this.service.isAuthenticated=true;

      if(this.service.isAuthenticatedUser()){
        this.router.navigate(['/layout']);
      }
      else{
        this.router.navigate(['/login']);
      }
     
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

  }

}
