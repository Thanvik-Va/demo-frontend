import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { OrgServiceService } from 'src/app/services/services/org-service.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  implements OnInit{

  org: any = {};
  bp:any[]=[];
  ngOnInit(): void {


    this.orgService.getAllOrganizations().subscribe(response=>{
      console.log(response.response.data);
      this.org=response.response.data;
      this.org.forEach((x:any)=> {
        this.bp=x.businessPlaces;
      });
      console.log(this.bp)
    });

    this.organization={
      idField:'orgId',
      textField:'organizationName',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      limitSelection:1,
      
    }

    this.businessPlaces={
      idField:'businessPlaceId',
      textField:'businessPlaceLegalName',
      allowSearchFilter: true,
    
    }
  }

  roles:IDropdownSettings={};
  subRoles:IDropdownSettings={};
  organization:IDropdownSettings={};
  businessPlaces:IDropdownSettings={};


  test:any[]=[];

  constructor( private orgService: OrgServiceService){}

  public onItemSelect(data:any){
    console.log(data);
    this.test.push(data);
    console.log(this.test);
  }

  onItemDeSelect(data:any){
     // i want to remove the data value from test[] generate the code
     console.log(data);
     //The filter method creates a new array by filtering out elements that do not satisfy a given condition
     this.test = this.test.filter(item => item !== data);
     console.log(this.test);

     
  }



}
