import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../classes/project'; 
import { PctService } from 'src/app/services/pct.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../classes/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskForm!: FormGroup;
  statusOptions: string[] = ['In Progress', 'Completed', 'On Hold', 'Cancelled'];
  assigneeOptions: string[] = ['Lead 1', 'Lead 2', 'Lead 3', 'Lead 4'];
  membersOptions: string[] = ['Member 1', 'Member 2', 'Member 3', 'Member 4'];
  prjNameOptions: any[] = [];
  projectIdd!: any;
  p!: Project;
  task!: any;
  pr!: any;
  formData:any;
  employee:Employee[]=[];
  constructor(private fb: FormBuilder, private dataService: PctService, private route: Router, private router: ActivatedRoute,private toast:ToastrService,private emp:EmployeeService) {

    this.taskForm = this.fb.group({
      // id: [null],
      projectId: [null],
      name: [null, Validators.required],
      type: [null, Validators.required],
      description: [null, Validators.required],
      hours: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      status: [null, Validators.required],
      assignee: [null],
      // findType: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.projectIdd = params.get('projectId')
    });
    this.dataService.getAllNames().subscribe(response => {
      console.log(response.response.data)
      this.prjNameOptions = response.response.data;
    })
    
    if (this.projectIdd != 0) {
      this.dataService.getProjectById(this.projectIdd).subscribe((response) => {
        console.log(response.response.data)
        this.prjNameOptions = this.prjNameOptions.filter(pro => pro.id == this.projectIdd);
        console.log(this.prjNameOptions)
      });
    }
    this.emp.getEmployeeList().subscribe(data=>{
      this.employee=data;
    })





  }


  get name() {
    return this.taskForm.get('name')
  }
  get type() {
    return this.taskForm.get('type')
  }
  get description() {
    return this.taskForm.get('description')
  }
  get hours() {
    return this.taskForm.get('hours')
  }
  get status() {
    return this.taskForm.get('status')
  }
  get startDate() {
    return this.taskForm.get('startDate')
  }
  get endDate() {
    return this.taskForm.get('endDate')
  }
  get assignee() {
    return this.taskForm.get('assignee')
  }
  get projectId() {
    return this.taskForm.get('projectId')
  }

  clickToChild() {
    this.route.navigate(['/layout/child'])
  }
  taskSubmit() {
    console.log(this.taskForm.valid)
    if (this.taskForm.valid) {

      const formData = this.taskForm.value;
      console.log(this.taskForm.value);
      console.log(this.projectIdd)
      console.log(formData.projectId)
      // console.log(this.taskForm.get("projectId")?.value)


      if (this.projectIdd!=null) {
        // const formData = this.taskForm.value;
        console.log(formData)
        this.dataService.createTask(formData, this.projectIdd).subscribe((response) => {
          this.task = response.response.data
          console.log(this.task);
          this.toast.success("Child Project Task saved Successfully","Info",{
            positionClass:'toast-bottom-right',
            progressBar:true,
            progressAnimation:'increasing',
            timeOut:3000,
            easing:'ease-in',
            easeTime:1000
          })

        });



      }
      else {


        this.dataService.createTask(formData, formData.projectId).
          subscribe((response) => {
            this.task = response.response.data
            console.log(this.task)
            this.toast.success("Task saved Successfully","Info",{
              positionClass:'toast-bottom-right',
              progressBar:true,
              progressAnimation:'increasing',
              timeOut:3000,
              easing:'ease-in',
              easeTime:1000
            })

          })


        this.getProjectById1();
      }

    }
  }

  getProjectById1() {
    console.log(this.projectIdd)
    if (this.projectIdd) {
      console.log(this.projectIdd)
      this.dataService.getProjectById(this.projectIdd).subscribe((response) => {
        this.prjNameOptions = [response.response.data];

        if (this.prjNameOptions.length > 0) {
          this.taskForm.get('project')?.setValue(this.prjNameOptions[0].projectId);
          this.taskForm.get('project')?.disable();
        }
      });
    } else {
      this.dataService.getAllNames().subscribe((response) => {
        this.prjNameOptions = response.response.data;
        console.log(this.prjNameOptions)
      });
    }
  }



}





