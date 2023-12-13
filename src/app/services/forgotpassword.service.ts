import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {
  constructor(private http:HttpClient) { }

  baseUrl="http://localhost:8383/password/"

  public sendEmail(email:any): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}sendmail/${email}`)
  }

  public sendPasswordDetails(token:any,newPassword:any): Observable<any>{

    const httpparams=new HttpParams().set('token',token).set('newPassword',newPassword);
    //console.log('In service '+token+' '+newPassword);
    let forgotPassword={'token':token,'newPassword':newPassword}
    return this.http.post<any>(`${this.baseUrl}reset-password`,forgotPassword)
  }
}
