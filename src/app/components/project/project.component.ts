import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../classes/project'; 
import { PctService } from 'src/app/services/pct.service'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../classes/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit{

  projectForm!: FormGroup;
  project!: Project ;
  statusOptions: string[] = ['In Progress', 'Completed', 'On Hold', 'Cancelled'];
  projectOptions: any[] = []
  leadOptions: string[] = ['Lead 1', 'Lead 2', 'Lead 3', 'Lead 4'];
  all:any[]=[];
  employee:Employee[]=[];
  tempId:any;

  constructor(private fb:FormBuilder,private dataService:PctService,private router:Router,private toast:ToastrService,private emp:EmployeeService){
    this.projectForm=this.fb.group({
      name:this.fb.control('',[Validators.required]),
      type: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      projectId: this.fb.control(''),
      hours: this.fb.control(0, [Validators.required]),
      status: this.fb.control('', [Validators.required]),
      startDate: this.fb.control('', [Validators.required]),
      endDate: this.fb.control('', [Validators.required]),
      assignee: this.fb.control('', [Validators.required]),
      // employees: this.fb.array([Validators.required]),
      // subProjects:this.fb.control('', [Validators.required])

    })
  }
  ngOnInit(): void {
   this.dataService.getAllParent().subscribe(response=>{
    this.projectOptions=response.response.data;
    console.log(response)
  })
  
    
    this.dataService.getAll().subscribe(response=>{
      this.all=response.response.data;
      console.log(response)
    })

    this.emp.getEmployeeList().subscribe(data=>{
      this.employee=data;

    })

  
    
      
   
  }

  get name(){
    return this.projectForm.get("name")
  }
  get type(){
    return this.projectForm.get("type")
  }
  get description(){
    return this.projectForm.get("description")
  }
  get projectId(){
    return this.projectForm.get("projectId")
  }
  get hours(){
    return this.projectForm.get("hours")
  }
  get status(){
    return this.projectForm.get("status")
  }
  get startDate(){
    return this.projectForm.get("startDate")
  }
  get endDate(){
    return this.projectForm.get("endDate")
  }
  get assignee(){
    return this.projectForm.get("assignee")
  }
  // get subProjects(){
  //   return this.projectForm.get("subProjects")
  // }
  // get employees():FormArray{
  //   return this.projectForm.get("employees") as FormArray
  // }


  onSubmit() {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
      this.dataService.createProject(formData).subscribe((response) => {
        this.project = response.response.data;
        // console.log(this.project.id);
        this.tempId=this.project.id;
       console.log(this.tempId);
       this.toast.success("Parent project saved successfully and navigated to create childproject", "Info", {
        positionClass: 'toast-bottom-top',
        progressBar: true,
        progressAnimation: 'increasing',
        timeOut: 2000,
        easing: 'ease-in',
        easeTime: 1000
      });
        
        // this.dataService.getParentPrjs().subscribe(data => { this.projectOptions = data }, error => console.log(error));

        
      }, (error) =>  this.toast.error("Project already exists","Info",{
        positionClass: 'toast-bottom-top',
        progressBar: true,
        progressAnimation: 'increasing',
        timeOut: 2000,
        easing: 'ease-in',
        easeTime: 1000

      })
      );
    }
  }

  clickToChild() {
    this.onSubmit();
    this.tempId=this.project.id;
        console.log(this.tempId);
        this.router.navigate(['/layout/child', { projectId: this.tempId }])
            this.toast.success("Parent project saved successfully and navigated to create childproject", "Info", {
              positionClass: 'toast-bottom-top',
              progressBar: true,
              progressAnimation: 'increasing',
              timeOut: 2000,
              easing: 'ease-in',
              easeTime: 1000
            });
   
}


  clickToTask(){
    this.onSubmit();
    this.tempId=this.project.id;
    console.log(this.tempId)
    
      console.log(this.project.id);
      this.router.navigate(['/layout/task',  { projectId: this.tempId }]);
      this.toast.success(
        "Parent project added successfully and navigated to create task",
        "Info",
        {
          positionClass: 'toast-bottom-right',
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000,
          easing: 'ease-in',
          easeTime: 1000,
        }
      );

 
}


  onSelectParentProject() {
    const selectedParentProjectId = this.projectForm.get('projectId')?.value;
    console.log(selectedParentProjectId)
    if (selectedParentProjectId) {
      this.getProjectDetailsById(selectedParentProjectId);
    }
  }
  
  getProjectDetailsById(projectId: number) {
    this.dataService.getProjectById(projectId).subscribe(response => {
      this.projectForm.patchValue(response.response.data);
    }, error => console.log(error));
  }


  createChild(){
    this.router.navigate(['/layout/child'])
  }

}
