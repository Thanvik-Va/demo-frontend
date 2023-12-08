import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PctService {

  tokenData={}
constructor(private http: HttpClient) {
  const token=localStorage.getItem('token'); 
  this.tokenData={
    headers:new HttpHeaders({
      'Authorization':'Bearer '+token
    })
  }
} 

headers={
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
}

  private baseUrl = "http://localhost:8383/project/"

  createProject(project: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}` + "createProject1", project,this.tokenData);
  }

  getAllParent(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}` + 'getAllParentProjects',this.tokenData)
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}` + 'get',this.tokenData)
  }

  getProjetctByName(name: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}` + "getProjectByName/" + `${name}`,this.tokenData)
  }

  createTask(formData: any, parentProjectId: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}` + "createTask/" + `${parentProjectId}`, formData,this.tokenData);
  }
  getProjectById(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}` + 'getProjectById/' + `${projectId}`,this.tokenData)
  }

  getAllNames():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`+"getAll",this.tokenData)
  }

  updateProject(project:any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}`+"update",project,this.tokenData)
  }

  updateParentTasks(task:any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}`+"updateTask",task,this.tokenData)
  }
  
  getParentTasksByName(name:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`+"parent/"+`${name}`,this.tokenData)
  }





  // getAllPS(): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}` + 'getAll')
  // }

  // getAllChild(): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}` + 'getAllChild')
  // }



  // getParentTasksBasedOnTheirId(id:any):Observable<any>{
  //   return this.http.get<any>(`${this.baseUrl}`+"getParentTaskById/"+`${id}`)
  // }

  // getChildTasksBasedOnId(id:any):Observable<any>{
  //   return this.http.get<any>(`${this.baseUrl}`+"getChildTaskById/"+`${id}`)
  // }
}
