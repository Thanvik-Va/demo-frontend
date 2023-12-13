import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  userDetails: any;

  constructor(private loginService: LoginServiceService,
    private router: Router) { }


  ngOnInit() {

    this.getDetails();
    console.log("ngOnInit called");
  }

  getDetails() {
    console.log("getDetails called");
    this.loginService.getUserDetails().subscribe(
      (data: any) => {
        console.log(data);
        this.userDetails = data;
        this.navigateToDashboard();
      },
      error => {
        console.log(error);
      }
    )
  }
  navigateToDashboard() {
    const authToken = localStorage.getItem('token');
  
    // Check if the user is authenticated
    if (authToken) {
      // Do whatever logic you need to do in the current component
      // This block will prevent navigation to the dashboard
      console.log('User is authenticated. Perform actions in the current component.');
    } else {
      // Navigate to the dashboard if the user is not authenticated
      this.router.navigate(['/layout/dashboard']);
    }
  }
  

}
