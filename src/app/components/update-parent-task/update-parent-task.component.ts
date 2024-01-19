import { Component, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PctService } from 'src/app/services/pct.service';
import { Employee } from '../classes/employee';
import { Project } from '../classes/project';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-parent-task',
  templateUrl: './update-parent-task.component.html',
  styleUrls: ['./update-parent-task.component.css']
})
export class UpdateParentTaskComponent {
  taskForm!: FormGroup;
  statusOptions: string[] = ['In Progress', 'Completed', 'On Hold', 'Cancelled'];
  assigneeOptions: string[] = ['Lead 1', 'Lead 2', 'Lead 3', 'Lead 4'];
  membersOptions: string[] = ['Member 1', 'Member 2', 'Member 3', 'Member 4'];
  prjNameOptions: any[] = [];
  projectIdd!: any;
  p!: Project;
  task!: any;
  pr!: any;
  formData!:any;
  taskName:any;

  employee:Employee[]=[];
  constructor(private fb: FormBuilder, private dataService: PctService, private route: Router, private router: ActivatedRoute,private toast:ToastrService,private emp:EmployeeService ) {

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
    this.router.paramMap.subscribe(params=>{
      this.taskName=params.get('name')
      console.log(this.taskName)
    })
    if(this.taskName){
      this.dataService.getParentTasksByName(this.taskName).subscribe(response=>{
        this.taskForm.patchValue(response.response.data);
      })
    }
    else{

     this.router.paramMap.subscribe(params => {
      this.projectIdd = params.get('projectId')
    });
   
  
    if (this.projectIdd != 0) {
      this.dataService.getProjectById(this.projectIdd).subscribe((response) => {
        console.log(response.response.data)
        this.prjNameOptions = this.prjNameOptions.filter(pro => pro.id == this.projectIdd);
        console.log(this.prjNameOptions)

      });
    }

   




  }
  this.dataService.getAllNames().subscribe(response => {
    console.log(response.response.data)
    this.prjNameOptions = response.response.data;
  })
  this.emp.getEmployeeList().subscribe(data=>{
    this.employee=data;
    console.log(this.employee)
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



  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }
  taskSubmit(event:Event) {
    event.preventDefault();
    console.log(this.taskForm.valid)
    const d=this.taskForm.value;
    // const na=this.router.snapshot.paramMap.get('name')
    if (this.taskName){
      this.dataService.updateParentTasks(d).subscribe(response=>{
        this.toast.success("Task updated","",{
          positionClass:'toast-top-right',
          progressBar:true,
          progressAnimation:'increasing',
          timeOut:3000,
          easing:'ease-in',
          easeTime:1000
        })
      })

    }
  //   else{
  //   if (this.taskForm.valid) {

  //     const formData = this.taskForm.value;

  //     console.log(this.taskForm.value)
  //     console.log(this.projectIdd);
  //   //  console.log(this.taskForm.get("projectIdd")?.value)
  //   console.log(formData.projectId)
  //     //formData.projectId=this.projectIdd
   
    
  //     if (this.projectIdd != null) {
        
  //       console.log(formData)
  //       this.dataService.createTask(formData, this.projectIdd).subscribe((response) => {
  //         this.task = response.response.data
  //         console.log(this.task);
  //         this.toast.success("Child Project Task saved Successfully","Info",{
  //           positionClass:'toast-bottom-right',
  //           progressBar:true,
  //           progressAnimation:'increasing',
  //           timeOut:3000,
  //           easing:'ease-in',
  //           easeTime:1000
  //         })

  //       });
  //     }
  //     else {
  //      console.log(formData)
  //       this.dataService.createTask(formData, formData.projectId).
  //         subscribe((response) => {
  //           this.task = response.response.data
  //           console.log(this.task)
  //           this.toast.success("Task saved Successfully","Info",{
  //             positionClass:'toast-bottom-right',
  //             progressBar:true,
  //             progressAnimation:'increasing',
  //             timeOut:3000,
  //             easing:'ease-in',
  //             easeTime:1000
  //           })

  //         })


  //       // this.getProjectById1();
  //     }

  //   }
  // }
}

  // clickToChild() {
  //   this.route.navigate(['child'])
  // }

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
