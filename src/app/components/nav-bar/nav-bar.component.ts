import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter } from 'rxjs';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { SlideBarComponent } from '../slide-bar/slide-bar.component';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  

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
  alert("Are you sure you want to logout?")
  }

  // toggleSidebar() {
  //   console.log('side bar');
    
  //   this.loginService.toggleSidebar();
  // }

}
 

