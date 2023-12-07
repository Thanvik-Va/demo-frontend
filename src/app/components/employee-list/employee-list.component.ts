import { Component, OnInit } from '@angular/core';
 import { Employee } from '../classes/employee';
 import { EmployeeService } from 'src/app/services/employee.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as saveAs from 'file-saver';
 
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
  
  constructor( private employeeService:EmployeeService, private fb:FormBuilder ) { }

public frmEdit = this.fb.group({
  emp_id:this.fb.control('',[Validators.required]),
  mobile_no: this.fb.control('', [Validators.required, Validators.pattern(/\d{10}/)]),
  email_id:this.fb.control('',[Validators.required, Validators.email]),
  department:this.fb.control('',[Validators.required, Validators.minLength(4)]),
  role:this.fb.control('',[Validators.required]),
  org_name:this.fb.control('',[Validators.required]),
  emp_type:this.fb.control('',[Validators.required]),
  bp:this.fb.control('',[Validators.required]),
  address:this.fb.control('',[Validators.required, Validators.minLength(4)])
 });

 edit(obj: any){
  this.frmEdit.patchValue(obj);
 }

 resetForm() {
  this.frmEdit.reset();
}

  ngOnInit(): void {
   this.getEmployees();
  }

  private getEmployees(){
    this.employeeService.getEmployeeList().subscribe(data =>{
      this.employees = data;
    });
  }

submit(){
  this.employeeService.updateEmployees(this.frmEdit.value).subscribe((data: Employee)=>{
  this.employee = data;
  console.log(data);
  this.getEmployees();
  });
  
}
  
Delete(id:number){
  this.employeeService.DeleteEmployee(id).subscribe((data:Employee)=>{
  this.employee = data;
  });
  this.employeeService.getEmployeeList().subscribe(data =>{
    this.employees = data;
  }); 
}

save(){
  this.employeeService.createEmployee(this.frmEdit.value).subscribe((data:Employee)=>{
    console.log(data);
    this.employee=data;
    this.getEmployees();
});

}

generateExcel(){
  this.employeeService.excelExport().subscribe((data:Blob)=>{
    console.log(data);
    const blob=new Blob([data],{ type: 'application/octet-stream' });
    saveAs(data, 'Emp_List.xls');
  },
  error=>{
    console.log(error);
  }
  )
}
}



