// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable} from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from "rxjs";
import { LoginServiceService } from "./login-service.service";

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate{

  constructor(private router:Router,private loginService:LoginServiceService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const authToken = localStorage.getItem('token');
    const isDashboardRoute = state.url === '/layout/dashboard';
    if(authToken && isDashboardRoute){
      return true;
    }
    else if(authToken){
      return true;
    }
    else{
      this.router.navigate(['']);
       console.log("authentication failed in auth.guard.ts")
      alert("Please enter credentials to login..")
      return false;
    }
  }
  }
  

