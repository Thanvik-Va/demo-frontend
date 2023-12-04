import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isAuthenticated=false;

  logIn(){
    this.isAuthenticated=true;
    }

  logOut(){
    this.isAuthenticated=false;
  }

  isAuthenticatedUser():boolean{
    return this.isAuthenticated;
  }
}
