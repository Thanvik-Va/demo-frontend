import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ForgotpasswordService } from 'src/app/services/forgotpassword.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-sendemailforgotpassword',
  templateUrl: './sendemailforgotpassword.component.html',
  styleUrls: ['./sendemailforgotpassword.component.css']
})
export class SendemailforgotpasswordComponent {
  constructor(private service: LoginServiceService,
    private fb: FormBuilder,private passwordservice:ForgotpasswordService) {

  }


  public forgotPasswordForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)]),
  });

  get Email(): FormControl {
    return this.forgotPasswordForm.get("email") as FormControl;
  }


  submitForm() {

    console.log(this.forgotPasswordForm.value.email);
    

    if (this.forgotPasswordForm.valid) {
      this.passwordservice.sendEmail(this.forgotPasswordForm.value.email).subscribe(
        data=>{
          console.log(data);
        },
        err=>{
          console.log(err);
        }
      )
    }
  }

  message() {
    alert("A password verification message has been sent to your email...")
  }

}
