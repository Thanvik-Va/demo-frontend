import { Organization } from './../classes/organization';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { OrgServiceService } from 'src/app/services/services/org-service.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import DataTable from 'datatables.net-dt';
import { NgPluralCase } from '@angular/common';

declare var $:any;
@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
})
export class OrganizationComponent {
  checkStatus!: boolean;
  states: string[] = [
    'Delhi',
    'Kerala',
    'Karnataka',
    'Maharashtra',
    'Telangana',
    'Tamil Nadu',
    'West Bengal',
  ];

  countries: string[] = ['India'];

  orgRegister: FormGroup;
  bpRegister: FormGroup;
  orgId: any;
  organization: any = {}; // Use the correct type or interface if available
  isEditMode: boolean = false;
  bpId:any;
  bpList:any[]=[];
  selectedItems:any[] = [];
  ischeck!:boolean;
ischecked:boolean=false;
  pageSize:any;
  dataTable:any;

  constructor(
    private fb: FormBuilder,
    private orgService: OrgServiceService,
    private toastr: ToastrService,
    ) 
    {
      this.orgRegister = this.fb.group({
      organizationName: ['', [Validators.required]],
      countryName: ['', [Validators.required]],
      stateName: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.minLength(6)]],
      addressLine1: ['', [Validators.required, Validators.minLength(5)]],
      addressLine2: ['', [Validators.required, Validators.minLength(4)]],
      contact: [
        '',
        [Validators.required, Validators.pattern(/\+91\d{10}/), Validators.minLength(10)],
      ],
    });

    this.bpRegister = this.fb.group({
      businessPlaceLegalName: ['', [Validators.required]],
      businessPlaceLocation: ['', [Validators.required]],
      stateName: ['', [Validators.required]],
      countryName: ['', [Validators.required]],
      businessPlaceContact: [
        '',
        [Validators.required, Validators.pattern(/\+91\d{10}/)],
      ],
      businessPlaceZipCode: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.orgId = localStorage.getItem('orgid');
    this.getOrganization(this.orgId);
   

    
  }

  get OrganizationName(): FormControl {
    return this.orgRegister.get('organizationName') as FormControl;
  }
  get Country(): FormControl {
    return this.orgRegister.get('countryName') as FormControl;
  }

  get State(): FormControl {
    return this.orgRegister.get('stateName') as FormControl;
  }

  get Pincode(): FormControl {
    return this.orgRegister.get('zipCode') as FormControl;
  }

  get Address1(): FormControl {
    return this.orgRegister.get('addressLine1') as FormControl;
  }

  get Address2(): FormControl {
    return this.orgRegister.get('addressLine2') as FormControl;
  }

  get MobileNumber(): FormControl {
    return this.orgRegister.get('contact') as FormControl;
  }
  get businessPlaceLegalName(): FormControl {
    return this.bpRegister.get('businessPlaceLegalName') as FormControl;
  }
  get businessPlaceLocation(): FormControl {
    return this.bpRegister.get('businessPlaceLocation') as FormControl;
  }
  get stateName(): FormControl {
    return this.bpRegister.get('stateName') as FormControl;
  }
  get countryName(): FormControl {
    return this.bpRegister.get('countryName') as FormControl;
  }
  get businessPlaceContact(): FormControl {
    return this.bpRegister.get('businessPlaceContact') as FormControl;
  }
  get businessPlaceZipCode(): FormControl {
    return this.bpRegister.get('businessPlaceZipCode') as FormControl;
  }

  // }

  collectForm() {
    if (this.orgRegister.valid) {
      this.orgService.addOrganization(this.orgRegister.value).subscribe((response) => {
        this.handleResponse(response);
      });
    }
  }
populateOrganizationForm() {
    this.orgRegister.patchValue({
      organizationName: this.organization.organizationName,
      countryName: this.organization.countryName,
      stateName: this.organization.stateName,
      zipCode: this.organization.zipCode,
      addressLine1: this.organization.addressLine1,
      addressLine2: this.organization.addressLine2,
      contact: this.organization.contact,
    });
  }

  editBusinessPlace(businessPlace: any) {
    this.isEditMode = true;

    // Set the form values with the selected business place details
    this.bpRegister.patchValue({
      businessPlaceLegalName: businessPlace.businessPlaceLegalName,
      businessPlaceLocation: businessPlace.businessPlaceLocation,
      businessPlaceContact: businessPlace.businessPlaceContact,
      businessPlaceZipCode: businessPlace.businessPlaceZipCode,
      countryName: businessPlace.countryName,
      stateName: businessPlace.stateName,
    });
    this.bpId=businessPlace.businessPlaceId;
    console.log(this.bpId)
  }

 

  onSubmit() {
    if (this.bpRegister.valid) {
      const businessPlaceData = this.bpRegister.value;
      // const existingBusinessPlace = this.organization.businessPlaces.find(
      //         (bp: any) => bp.businessPlaceLegalNam === businessPlaceData.businessPlaceLegalName);
      //         console.log(existingBusinessPlace)
      if (this.isEditMode) {
        this.orgService
          .updateBusinessPlace(this.bpId, businessPlaceData)
          .subscribe((response) => {
            this.handleResponse(response);
          });
      } else {
        this.orgService.addBusinessPlace(businessPlaceData, this.orgId).subscribe((response) => {
          this.handleResponse(response);
        });
      }
    }
  }

  

  deleteBusinessPlace(businessPlace: any) {
    const confirmDelete = confirm('Are you sure you want to delete this business place?');

    if (confirmDelete) {
      this.orgService.deleteBusinessPlace(businessPlace.businessPlaceId).subscribe((response) => {
        this.handleResponse(response);
      });
    }
  }

  getOrganization(id: any) {
    this.orgService.getOrganization(id).subscribe((response) => {
      this.organization = response.response.data;
      console.log(this.organization)
      this.bpList=this.organization.businessPlaces;
      this.populateOrganizationForm();
      setTimeout(() => {
       this.dataTable= new DataTable('#mytbl',{
          lengthMenu: [4,5,6],
          scrollY: '200px',
          ordering:false,
          drawCallback: () => {
            // Reset selected items when the table is redrawn (e.g., changing pages)
            this.ischeck=false;
            this.bpList.forEach(bp=>bp.select=false);
            this.selectedItems = [];
           
          },
        
        })  
       
      }, 1000);
      

    });
  }
   
  index:any;
 
  onChangeCheck(event:any,index:any){
      this.index=index;
      const select=event.target.checked;
      this.selectedItems = this.bpList.filter(bp =>bp.select ==true);
      console.log(this.selectedItems);
     
      
  }

  x:any;
  onChangeCheckStatus(event:any){
    
    /*
    In DataTables, the rows() function is part of the DataTables API and is used to select 
    a set of rows in the table. It returns a DataTables API instance that allows you to perform
     various operations on the selected rows.Here are some common use cases for the rows() function:
    // */

    // console.log(this.dataTable.rows().data().toArray())
    
    // this.selectedItems = this.bpList.filter(bp =>bp.select ==true);
    // console.log(this.selectedItems)
    const pageInfo = this.dataTable.page.info();
    const currentPage = pageInfo.page + 1; // DataTables pages are 0-indexed
    //console.log(currentPage);
    const numberOfEntriesPerPage=this.dataTable.page.len();
     const index=(currentPage*numberOfEntriesPerPage)-(numberOfEntriesPerPage);
     const range=(currentPage*numberOfEntriesPerPage);

    if(event.target.checked){
      
       for(let x=index;x<range;x++){
         if( x<this.bpList.length){
         this.bpList[x].select=true;
         }
       }
       this.selectedItems=this.bpList.filter(bp=>bp.select==true);
       console.log(this.selectedItems); 
    }
    else
    {
       for(let x=index;x<range;x++){
         this.bpList[x].select=false;
       }
        this.selectedItems=this.bpList.filter(bp=>bp.select==false);
        console.log(this.selectedItems);
    
    }


  }
  

  deleteAll(){
    
    console.log(this.selectedItems);
  }

  handleResponse(response: any) {
    if (response.statusCode === 0) {
      this.toastr.success(response.message, 'Success', {
        positionClass: 'toast-top-right',
      });
      this.resetForms();
      this.getOrganization(this.orgId);
    } else {
      this.toastr.error('Something went wrong..!!', 'Error', {
        positionClass: 'toast-top-right',
      });
    }
  
  }

  resetForms() {
    this.orgRegister.reset();
    this.bpRegister.reset();
     this.isEditMode = false;
  }

  close() {
    this.resetForms();
   this.isEditMode = false;
   this.getOrganization(this.orgId);
  }



}