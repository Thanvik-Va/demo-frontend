import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
 import { Employee } from '../classes/employee';
 import { EmployeeService } from 'src/app/services/employee.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
 

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  
})
export class EmployeeListComponent  implements OnInit {
 
  employees :any=[];

  Role: number | null= null;

  Roles: any[] = [
   {id:111, roles:'Manager' },
   {id:222, roles:'Team Lead'},
   {id:555, roles:'Employee'},
   {id:333, roles:'Trainee'},
   {id:444, roles:'Intern'}
];

Emptype: number | null = null ;

EmpType : any[] = [
  {id:111, type:'Full-Time' },
  {id:222, type:'Part-Time'},
  {id:333, type:'Trainee'},
  {id:444, type:'Intern'}
];
  
  employee: Employee = new Employee();
  
  constructor(private dialog: MatDialog , private employeeService:EmployeeService, private fb:FormBuilder ) { }
openAddEmployeeDialog(): void {
  const dialogRef = this.dialog.open(AddComponent);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.employees.push(result);
    }
  });
}

public frmEdit = this.fb.group({
  emp_id:this.fb.control('',[Validators.required]),
  mobile_no: this.fb.control('', [Validators.required, Validators.pattern(/\d{10}/)]),
  email_id:this.fb.control('',[Validators.required, Validators.email]),
  department:this.fb.control('',[Validators.required, Validators.minLength(4)]),
  role:this.fb.control(''),
  org_name:this.fb.control(''),
  emp_type:this.fb.control(''),
  bp:this.fb.control(''),
  address:this.fb.control('',[Validators.required, Validators.minLength(4)])
 });

 edit(obj: any){
  this.frmEdit.patchValue(obj);
 }
 get Emp_id():FormControl{
  return this.frmEdit.get("emp_id")as FormControl;
}

 get Mobile():FormControl{
  return this.frmEdit.get("mobile_no")as FormControl;
}

get Deparment():FormControl{
  return this.frmEdit.get("department")as FormControl;
}

get role():FormControl{
  return this.frmEdit.get("role")as FormControl;
}

get email_id():FormControl{
  return this.frmEdit.get("email_id")as FormControl;
}

get Address():FormControl{
  return this.frmEdit.get("address")as FormControl;
}

get Emp():FormControl{
  return this.frmEdit.get("emp_type") as FormControl
}

get Organization():FormControl{
 return this.frmEdit.get("org_name") as  FormControl;
}

get BP():FormControl{
 return this.frmEdit.get("bp") as FormControl;
}

 

  ngOnInit(): void {
   this.getEmployees();
  }
  private getEmployees(){
    this.employeeService.getEmployeeList().subscribe(data =>{
      this.employees = data;
    });
  
  }


  public getEmployeesData(data:any){
    this.employees=data;
  }


submit(){
  this.employeeService.updateEmployees(this.frmEdit.value).subscribe((data: Employee)=>{
  this.employee = data;
  console.log(data);
  // this.refreshPage();
  
  });
}
  



Delete(id:number){
  this.employeeService.DeleteEmployee(id).subscribe((data:Employee)=>{
  this.employee = data;
  // this.refreshPage();
  });
}
}



