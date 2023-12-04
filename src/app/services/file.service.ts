import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  
// token1:String='';
//   //updating token after successfull login
//   updateTokeInFileservice(token: string) {
//     this.token1=token;
//   }
  private apiUrl = 'http://localhost:8383'; 

  headerOption={}

  constructor(private http: HttpClient) {
    let token=localStorage.getItem('token');
    this.headerOption={
     headers:new HttpHeaders({
       'Authorization':`Bearer ${token}`
     })
    }
  }
  
  //creating headers
  //  getHeaders():HttpHeaders{
  //   const token=this.token1;
  //   return new HttpHeaders().set('Authorization',`Bearer ${token}`);
  //  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('f', file, file.name);
    
    // const headers=this.getHeaders();  //getting headers with token

    return this.http.post(`${this.apiUrl}/files/upload`, formData,this.headerOption);
  }

  getFiles(): Observable<any> {
  // const headers=this.getHeaders();
    return this.http.get(`${this.apiUrl}/files/getFiles`,this.headerOption);
  }

  
  // downloadFile(fileName: string): Observable<Blob> {
  //   // const headers=this.getHeaders();
  //   return this.http.get(`${this.apiUrl}/files/download/${fileName}`, {
  //     responseType: 'blob',this.headerOption
  //   });
  // }
  downloadFile(fileName: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/files/download/${fileName}`, {
      responseType: 'blob',
      ...this.headerOption
    });
}
}
