import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrgServiceService {

  //token:string|null=null;

  tokenData={}
  constructor(private http: HttpClient) {
    this.tokenData={
      headers:new HttpHeaders({
        "Authorization":"Bearer "+localStorage.getItem("token")
      })
    }
  }

  addOrganization(data: any): Observable<any> {
    return this.http.post(
      ' http://localhost:8383/org/createOrganization',
      data,this.tokenData
    );
  }

  getOrganization(data: any): Observable<any> {
    
    return this.http.get<any>(`http://localhost:8383/org/getBy/${data}`,this.tokenData);
  }

  // add business place
  addBusinessPlace(bp: any, org: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8383/businessplaces/create/${org}`,
      bp,this.tokenData
    );
  }

  // get business places
  getBusinessPlace(): Observable<any> {
    return this.http.get<any>('http://localhost:8383/businessplaces/findAll',this.tokenData);
  }

  // getAll orgranizations

  getAllOrganizations():Observable<any>
  {
    return this.http.get<any>('http://localhost:8383/org/getAllOrganizations',this.tokenData)
  }

  // Add this method to update an existing business place
  updateBusinessPlace(businessPlaceId: any, data: any): Observable<any> {
    console.log(businessPlaceId);
    return this.http.put<any>(
      `http://localhost:8383/businessplaces/update/${businessPlaceId}`,
      data,
      this.tokenData
    );
  }

   // Add this method to delete a business place
   deleteBusinessPlace(businessPlaceId: any): Observable<any> {
    return this.http.delete<any>( `http://localhost:8383/businessplaces/${businessPlaceId}`,
      this.tokenData
    );
  }

  // Delete all business places
  //  deleteAllBusinessPlaces(bp:any[]):{
  //   //return this.http.delete<any>('http://localhost:8383/deleteAllBusinessPlaces',bp,this.tokenData)
  //  }
}
