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
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { LoginServiceService } from "./login-service.service";

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate{

  constructor(private authServ:AuthService,private router:Router,private loginServ:LoginServiceService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.loginServ.isAuthenticatedUser()){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      console.log("authentication failed in auth.guard.ts")
      return false;
    }
  }
  
}
