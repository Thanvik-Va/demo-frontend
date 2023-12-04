import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentails } from '../credentails';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
 
  //checking authentication to activate routes
 isAuthenticated=false;
 isAuthenticatedUser():boolean{
  return this.isAuthenticated;
 }

  //private httpOptions={headers:HttpHeaders};
  token: string | null = null  /* holds the authentication token intially set to null  */
  // httpOptions = { headers: new HttpHeaders() };

  //making http requests
  constructor(private http: HttpClient) {

  }
  private dataSubject = new BehaviorSubject<any>(null);

  data$ = this.dataSubject.asObservable(); // Observable for the data subject that emits updated data to subscribers.

  // //updates the token property and emits the updated data using the dataSubject
  updateData(data: any) {
    this.token = data;
    console.log("Token --> " + this.token);
    this.dataSubject.next(data);
  }


  httpapi = 'http://localhost:8383/auth/login'
  httpgetapi = 'http://localhost:8383/auth/get-user'
  httpregister='http://localhost:8383/auth/save'

  public register(data:any):Observable<any>{
    return this.http.post<any>(this.httpregister,data);
  }

  // performs post request to the authentication api with user data
  public login(data: User): Observable<any> {
    return this.http.post<any>(this.httpapi, data);
  }

  //fetches user details user details using get request with stored authentication token from the   local storage
  public getUserDetails(): Observable<User> {
    console.log("getUserDetails in login service called");

    const tokenFound = localStorage.getItem('token');
    const httpoptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + tokenFound
      })
    }
    return this.http.get<User>(this.httpgetapi, httpoptions);
  }
 
}
