import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrgServiceService {

  //token:string|null=null;

  constructor(private http: HttpClient) {}

  updateTokenInOrg(data:any){
    console.log(`Org Service --> ${data}`);
    //this.token=data;
    
    //this.dataSubject.next(data);
  }

  // private httpOptions={
  //   headers:new HttpHeaders({
  //     'Authorization':`Bearer ${token}`
  //   })
  // }

  

  addOrganization(data: any): Observable<any> {
    const token=localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post(
      ' http://localhost:8383/org/createOrganization',
      data,{headers}
    );
  }

  getOrganization(data: any): Observable<any> {
    const token=localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.get<any>(`http://localhost:8383/org/getBy/${data}`,{headers});
  }

  // add business place
  addBusinessPlace(bp: any, org: any): Observable<any> {
    const token=localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<any>(
      `http://localhost:8383/businessplaces/create/${org}`,
      bp,{headers}
    );
  }

  // get business places
  getBusinessPlace(): Observable<any> {
    const token=localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.get<any>('http://localhost:8383/businessplaces/findAll',{headers});
  }
}
