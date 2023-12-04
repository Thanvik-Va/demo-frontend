import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  constructor(private fb:FormBuilder,private service:LoginServiceService,private router:Router){}

  email:String='';
  userName:String='';
  password:String='';

  public registerForm=this.fb.group({
    email:this.fb.control('',[Validators.required, Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)]),
    userName:this.fb.control('',[Validators.required]),
    password:this.fb.control('',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)])
  })

  get Email():FormControl{
    return this.registerForm.get("email") as FormControl;
  }

  get UserName():FormControl{
    return this.registerForm.get("userName") as FormControl;
  }

  get Password():FormControl{
    return this.registerForm.get("password") as FormControl;
  }

  onRegister(data:any){
    if(this.registerForm.valid){
      this.service.register(data).subscribe(
        (response)=>{
          console.log(response);
          if(response.userId!=null){
            this.router.navigate(['/login']);
          }
          else{
            this.router.navigate(['/register']);
            console.log('resgistration failed')
          }
      })
    }
    else{
      console.log('registration failed due to invalid form');
    }
  }
}
