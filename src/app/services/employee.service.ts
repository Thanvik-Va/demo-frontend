import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import {Observable} from 'rxjs';
import { Employee } from '../components/classes/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // private baseURL= "http://localhost:8383/api/v1";
  tokenData={}
  constructor(private httpclient: HttpClient  ) {
    let token=localStorage.getItem('token');
    this.tokenData={
      headers:new HttpHeaders({
        'Authorization':'Bearer '+token
      })
    }
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
