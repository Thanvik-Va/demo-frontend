import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-nav-bar-for-org-list',
  templateUrl: './nav-bar-for-org-list.component.html',
  styleUrls: ['./nav-bar-for-org-list.component.css']
})
export class NavBarForOrgListComponent {

  
  username='supergas';
  profile='Incresol'
  currentComponent = 'dashboard'
  components:any[] =[

  {
      // name : 'AboutUs',
      // baseUrl : '/aboutus'
  },
  {
      // name : 'Contact',
      // baseUrl : '/contact'
  },
  {
  //  name : 'Profile'
  },
  {
    name : 'org-org',
   baseUrl : '/org-org'
  },
  {
    name : 'dashboard',
   baseUrl : '/dashboard'
  }
   
];
 
  

constructor(private loginService: LoginServiceService, private router: Router, private dailogRef:MatDialog) {
  router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd)
  ).subscribe((event: NavigationEnd) => {
    this.currentComponent = event.urlAfterRedirects.split('/')[1] || 'dashboard';
  });
}

logout(){
  //alert("Are you sure you want to logout?")
  if(confirm('Are you sure you want to logout?')){
   // this.authServ.logOut();
   this.loginService.isAuthenticated=false;
    localStorage.removeItem('token');
    
   // window.location.href='/login';
   this.router.navigate(['']);
  }
  else{
    this.router.navigate([]);
    console.log("logout cancelled");
  }

  }


}
