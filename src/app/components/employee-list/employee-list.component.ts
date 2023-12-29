import { Component, OnInit } from '@angular/core';
import { Employee } from '../classes/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as saveAs from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { OrgServiceService } from 'src/app/services/services/org-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})

export class EmployeeListComponent implements OnInit {

  employees: any = [];

  Role: number | null = null;
  organization:any[]=[];
  bPlace:any[]=[];

  Roles: any[] = [
    { id: 111, roles: 'Manager' },
    { id: 222, roles: 'Team Lead' },
    { id: 555, roles: 'Employee' },
    { id: 333, roles: 'Trainee' },
    { id: 444, roles: 'Intern' }
  ];

  Emptype: number | null = null;

  EmpType: any[] = [
    { id: 111, type: 'Full-Time' },
    { id: 222, type: 'Part-Time' },
    { id: 333, type: 'Trainee' },
    { id: 444, type: 'Intern' }
  ];

  employee: Employee = new Employee();
  
  constructor( private employeeService:EmployeeService, private fb:FormBuilder,private toaster:ToastrService,private org:OrgServiceService ) { }

  
  public frmEdit = this.fb.group({
    emp_id: this.fb.control(''),
    mobile_no: this.fb.control('', [Validators.required, Validators.pattern(/\d{10}/)]),
    email_id: this.fb.control('', [Validators.required, Validators.email]),
    department: this.fb.control('', [Validators.required, Validators.minLength(4)]),
    role: this.fb.control('', [Validators.required]),
    org_name: this.fb.control('', [Validators.required]),
    emp_type: this.fb.control('', [Validators.required]),
    bp: this.fb.control('', [Validators.required]),
    address: this.fb.control('', [Validators.required, Validators.minLength(4)])
  });

  edit(obj: any) {
    this.frmEdit.patchValue(obj);
  }

  resetForm() {
    this.frmEdit.reset();
  }

  ngOnInit(): void {
    this.getEmployees();
    this.org.getAllOrganizations().subscribe(response=>{
      this.organization=response.response.data;
      console.log(this.organization);
      
    })
    this.org.getBusinessPlace().subscribe(response=>{
      this.bPlace=response.response.data;
      console.log(this.bPlace);
    })
  }

  private getEmployees() {
    this.employeeService.getEmployeeList().subscribe(data => {
      this.employees = data;
    });
  }

submit(){
  this.employeeService.updateEmployees(this.frmEdit.value).subscribe((data: Employee)=>{
  this.employee = data;
  console.log(data);
  this.getEmployees();
  this.toaster.success('Successful..!','Success',{
    positionClass:'toast-top-right'
  });
  });
  //  this.refreshPage();
}
  
Delete(id:number){
  this.employeeService.DeleteEmployee(id).subscribe((data:Employee)=>{
  this.employee = data;
  this.toaster.success('Deleted Successfully..!','Success');
  this.getEmployees();
  });
  this.refreshPage();
}



  save() {
    this.employeeService.createEmployee(this.frmEdit.value).subscribe((data: Employee) => {
      console.log(data);
      this.employee = data;
      this.getEmployees();
      this.toaster.success('Employee created successfully!', 'Success');
    });
  }

  refreshPage() {
    location.reload();
  }

  generateExcel() {
    this.employeeService.excelExport().subscribe((data: Blob) => {
      console.log(data);
      const blob = new Blob([data], { type: 'application/octet-stream' });
      saveAs(data, 'Emp_List.xls');
      this.toaster.success('Excel file generated successfully!', 'Success');
    },
      error => {
        console.log(error);
        this.toaster.error('Error generating Excel file!', 'Error');
      }
    );
  }
}
