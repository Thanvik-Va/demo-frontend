import { Organization } from './../classes/organization';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrgServiceService } from 'src/app/services/services/org-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
})
export class OrganizationComponent  implements OnInit{
  bpDetails: any[] = [];

  checkStatus!: boolean;

  states: string[] = [
    'Kerala',
    'Maharastra',
    'Delhi',
    'Uttar Pradesh',
    'Karnataka',
    'Madhya Pradesh',
  ];
  public countries: string[] = [
    'India',
    'Israel',
    'Usa',
    'Dubai',
    'Uk',
    'France',
    'London',
  ];

  bpRegister!: FormGroup;
  orgId: any;

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
    this.getBpDetails();
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

  

  collectForm() {
    if (this.orgRegister.valid) {
      this.orgService
        .addOrganization(this.orgRegister.value)
        .subscribe((response: { statusCode: number; }) => {
          if (response.statusCode == 0) {

            this.toastr.success('Saved Successfully','Sucess', {
              positionClass: 'toast-top-right',
            });
          } else {
            this.toastr.error('Something went wrong..!!', 'Error', {
              positionClass: 'toast-top-right',
              // progressBar:true,
              // progressAnimation:'increasing',
              // easing: 'ease-in',
              // easeTime: 1000,
            });
          }
        });
    }
  }

  // get organization
  getOrganization(id: any) {
    this.orgService.getOrganization(id).subscribe((response: { response: { data: Organization; }; }) => {
      this.organization = response.response.data;

      // if (res.status == 'OK') {
      //   this.organization = res.data;
      //   this.msg = res.message;
      //   this.toastr.info(this.msg, 'Sucess', {
      //     positionClass: 'toast-top-center',
      //     progressBar: true,
      //     progressAnimation: 'increasing',
      //     easing: 'ease-in',
      //     easeTime: 1000,
      //     timeOut: 1500,
      //   });
      // } else {
      //   this.msg = 'Something went wrong';
      //   this.toastr.error(this.msg, 'Error', {
      //     positionClass: 'toast-top-center',
      //     easing: 'ease-in',
      //     easeTime: 1000,
      //     timeOut: 1500,
      //   });
      // }
    });
  }

  getBpDetails() {
    this.orgService.getBusinessPlace().subscribe((response: any[]) => {
      this.bpDetails = response;
      
      
      //console.log(this.bpDetails);
    });
  }

  onSubmit() {
    if (this.bpRegister.valid) {
      this.orgService
        .addBusinessPlace(this.bpRegister.value, this.orgId)
        .subscribe((response: { response: { data: any; }; statusCode: number; }) => {
          
   
          if (response.statusCode == 0) {
            console.log('hi-this is vamshi')
            this.toastr.success('Saved Successfully','Sucess', {
              positionClass: 'toast-top-left',
            });
            this.bpRegister.reset();
            this.getBpDetails();
          } else {
            this.toastr.error('Something went wrong..!!', 'Error', {
              positionClass: 'toast-top-right',
              // progressBar:true,
              // progressAnimation:'increasing',
              // easing: 'ease-in',
              // easeTime: 1000,
              // timeOut: 1800,
            });
            this.bpRegister.reset();
          }
        });
    }
  }

  // this.orgService
  // .addBusinessPlace(this.bpRegister.value, this.orgId)
  // .subscribe({
  //   next: (val: any) => {
  //     alert('Business place added successfully');
  //     this.bpRegister.reset();
  //   },
  //   error: (err: any) => {
  //     console.log(err);
  //   },
  // });

  close() {
    this.bpRegister.reset();
   // location.reload();
   this.getOrganization(this.orgId);
  }
}
