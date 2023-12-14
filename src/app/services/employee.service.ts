import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
 import {Observable} from 'rxjs';
import { Employee } from '../components/classes/employee';
import { ToastrModule } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnInit {

  


  // private baseURL= "http://localhost:8383/api/v1";
  tokenData={}
  constructor(private httpclient: HttpClient,private toast:ToastrModule  ) {
    let token=localStorage.getItem('token');
    this.tokenData={
      headers:new HttpHeaders({
        'Authorization':'Bearer '+token
      })
    }
   }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getEmployeeList() : Observable<Employee[]>{
  
    return this.httpclient.get<Employee[]>("http://localhost:8383/api/v1/getAll",this.tokenData);
  }

  createEmployee(employee: any): Observable<any>{
    return this.httpclient.post<any>("http://localhost:8383/api/v1/post",employee,this.tokenData)
  }

   updateEmployees(employee:any):Observable<Employee>{
    return this.httpclient.put<any>("http://localhost:8383/api/v1/put",employee,this.tokenData)
   }

   DeleteEmployee(id:number){
    return this.httpclient.delete<any>(`http://localhost:8383/api/v1/Delete/${id}`,this.tokenData)
  }

  //to get list of employees as xl sheet
 excelExport():Observable<Blob>{
  return this.httpclient.get("http://localhost:8383/getexcel",{
    responseType:'blob',
    ...this.tokenData
  });

 }

 
 
}
