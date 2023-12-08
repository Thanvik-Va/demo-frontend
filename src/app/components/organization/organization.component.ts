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
    this.orgId = localStorage.getItem('id');
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
  }

  onSubmit() {
    if (this.bpRegister.valid) {
      const businessPlaceData = this.bpRegister.value;
      const existingBusinessPlace = this.organization.businessPlaces.find(
              (bp: any) => bp.businessPlaceLegalName === businessPlaceData.businessPlaceLegalName);
              console.log(existingBusinessPlace)
      if (this.isEditMode) {
        this.orgService
          .updateBusinessPlace(existingBusinessPlace.businessPlaceId, businessPlaceData)
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
    });
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
    // this.isEditMode = false;
  }

  close() {
    this.resetForms();
  }}
