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
    'Maharastra',
    'Telanagana',
    'Tamilanadu',
    'West Bengal  ',
  ];
  public countries: string[] = ['India'];
  bpRegister!: FormGroup;
  orgId: any;
  bpDetails: any[] = [];
  orgDetails!: any[];
  organization: Organization = new Organization();

  constructor(
    private fb: FormBuilder,
    private orgService: OrgServiceService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.bpRegister = this.fb.group({
      businessPlaceLegalName: ['', [Validators.required]],
      businessPlaceLocation: this.fb.control('', [Validators.required]),
      stateName: this.fb.control('', [Validators.required]),
      countryName: this.fb.control('', [Validators.required]),
      businessPlaceContact: this.fb.control('', [
        Validators.required,
        Validators.pattern(/\+91\d{10}/),
      ]),
      businessPlaceZipCode: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {
    this.orgId = localStorage.getItem('id');
    console.log(this.orgId);
    this.getOrganization(this.orgId);
    const token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW1zaGlAZ21haWwuY29tIiwiaWF0IjoxNzAxMjQ0NDAwLCJleHAiOjE3MDEyNjI0MDB9.d0kqblgChkL0bTlqZnvcSs1DHLiLW3UQJi1VNh9YonR3ezSb5g_q6glGy1zSf_ZX1FsBPHTAaaB8QgOqhnes6g';
    localStorage.setItem("token",token);
    //this.getBpDetails();
  }

  public orgRegister = this.fb.group({
    organizationName: this.fb.control('', [Validators.required]),
    countryName: this.fb.control('', [Validators.required]),
    stateName: this.fb.control('', [Validators.required]),
    zipCode: this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    addressLine1: this.fb.control('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    addressLine2: this.fb.control('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    contact: this.fb.control('', [
      Validators.required,
      Validators.pattern(/\+91\d{10}/),
      Validators.minLength(10),
    ]),
  });

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

  // openBusiness() {
  //   const ref = this.dialog.open(BusinessPlaceComponent, {
  //     width: '450px',
  //     height: '450px',
  //     data: {},
  //   });

  // }

  collectForm() {
    if (this.orgRegister.valid) {
      this.orgService
        .addOrganization(this.orgRegister.value)
        .subscribe((response) => {
          if (response.statusCode == 0) {
            this.toastr.success(response.message, 'Sucess', {
              positionClass: 'toast-top-left',
            });
          } else {
            this.toastr.error('Something went wrong..!!', 'Error', {
              positionClass: 'toast-top-right',
            });
          }
        });
    }
  }


  editBusinessPlace(businessPlace:any) {
    // Set the form values with the selected business place details
    this.bpRegister.patchValue({
      businessPlaceLegalName: businessPlace.businessPlaceLegalName,
      businessPlaceLocation: businessPlace.businessPlaceLocation,
      businessPlaceContact: businessPlace.businessPlaceContact,
      businessPlaceZipCode: businessPlace.businessPlaceZipCode,
      countryName: businessPlace.countryName,
      stateName: businessPlace.stateName,
    });
  
    
    
  }
  

  // get organization
  getOrganization(id: any) {
    this.orgService.getOrganization(id).subscribe((response) => {
      this.organization = response.response.data;
      //console.log(this.organization)
    });
  }

  getBpDetails() {
    this.orgService.getBusinessPlace().subscribe((response) => {
      this.bpDetails = response;
      //console.log(this.bpDetails);
    });
  }




    onSubmit() {
      if (this.bpRegister.valid) {
        const businessPlaceData = this.bpRegister.value;
        // console.log(businessPlaceData)
        // Check if business place exists in the organization
        const existingBusinessPlace = this.organization.businessPlaces.find(
          (bp: any) => bp.businessPlaceLegalName === businessPlaceData.businessPlaceLegalName);
        console.log(existingBusinessPlace)
        if (existingBusinessPlace) {
          // Update existing business place
          this.orgService.updateBusinessPlace(existingBusinessPlace.businessPlaceId, businessPlaceData)
            .subscribe((response) => {
              if (response.statusCode === 0) {
                this.toastr.success(response.message, 'Success', {
                  positionClass: 'toast-top-right',
                });
                this.bpRegister.reset();
              } else {
                this.toastr.error('Something went wrong..!!', 'Error', {
                  positionClass: 'toast-top-right',
                });
              }
            });
        } else {
          // Create new business place
          this.orgService.addBusinessPlace(businessPlaceData, this.orgId)
            .subscribe((response) => {
            
              if (response.statusCode === 0) {
                this.toastr.success(response.message, 'Success', {
                  positionClass: 'toast-top-right',
                });
                this.bpRegister.reset();
              } else {
                this.toastr.error('Something went wrong..!!', 'Error', {
                  positionClass: 'toast-top-right',
                });
              }
            });
        }
      }
    }
       
      onCreateSubmit() {
        if (this.bpRegister.valid) {
          const businessPlaceData = this.bpRegister.value;
          console.log(businessPlaceData)
          // Check if business place exists in the organization
          const existingBusinessPlace = this.organization.businessPlaces.find(
            (bp: any) => bp.businessPlaceLegalName === businessPlaceData.businessPlaceLegalName);
          console.log(existingBusinessPlace)
          if (existingBusinessPlace) {
           
            this.toastr.error('Business Place already exits..!!', 'Error', {
              positionClass: 'toast-top-right'})
               
            }
          else {
            // Create new business place
            this.orgService.addBusinessPlace(businessPlaceData, this.orgId)
              .subscribe((response:any) => {
              
                if (response.statusCode === 0) {
                  this.toastr.success(response.message, 'Success', {
                    positionClass: 'toast-top-right',
                  });
                  this.bpRegister.reset();
                } else {
                  this.toastr.error('Something went wrong..!!', 'Error', {
                    positionClass: 'toast-top-right',
                  });
                }
              });
          }
        }
      }  


       // Add this method to handle the delete action
  deleteBusinessPlace(businessPlace: any) {
    const confirmDelete = confirm('Are you sure you want to delete this business place?');
    
    if (confirmDelete) {
      this.orgService.deleteBusinessPlace(businessPlace.businessPlaceId).subscribe(
        (response) => {
          if (response.statusCode === 0) {
            this.toastr.success(response.message, 'Success', {
              positionClass: 'toast-top-right',
            });
         
          } else {
            this.toastr.error('Something went wrong while deleting..!!', 'Error', {
              positionClass: 'toast-top-right',
            });
          }
        },
      );
    }
  
  }
      
    // if (this.bpRegister.valid) {
    //   this.orgService
    //     .addBusinessPlace(this.bpRegister.value, this.orgId)
    //     .subscribe((response) => {
    //       // console.log(response.response.data);
    //       if (response.statusCode == 0) {
    //         this.toastr.success(response.message, 'Sucess', {
    //           positionClass: 'toast-top-right',
    //         });
    //         this.bpRegister.reset();
    //       } else {
    //         this.toastr.error('Something went wrong..!!', 'Error', {
    //           positionClass: 'toast-top-right',
    //         });
    //         this.bpRegister.reset();
    //       }
    //     });
    // }
  
  close() {
    this.bpRegister.reset();
    location.reload();
  }}
