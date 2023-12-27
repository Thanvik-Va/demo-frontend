import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ForgotpasswordService } from 'src/app/services/forgotpassword.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-sendemailforgotpassword',
  templateUrl: './sendemailforgotpassword.component.html',
  styleUrls: ['./sendemailforgotpassword.component.css']
})
export class SendemailforgotpasswordComponent {
  constructor(private service: LoginServiceService,
    private fb: FormBuilder,private passwordservice:ForgotpasswordService,private toaster:ToastrService) {

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
    this.toaster.success("Mail sent successfully","",{
      positionClass:'toast-top-right',
      progressBar:true,
      progressAnimation:'increasing',
      timeOut:2000,
      easing:'ease-in',
      easeTime:1000
    });
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
  }

  

