import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../classes/project'; 
import { Router, ActivatedRoute } from '@angular/router';
import { PctService } from 'src/app/services/pct.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit{

  childProjectForm!: FormGroup;
  project: Project = new Project();
  parentId1!: any;
  p!: Project;
  prjNameOptions: any[] = [];
  options:any[]=[];
  proj!:Project;
  p2:Project=new Project();
  
  statusOptions: string[] = ['In Progress', 'Completed', 'On Hold', 'Cancelled'];
  leadOptions: string[] = ['Lead 1', 'Lead 2', 'Lead 3', 'Lead 4'];
  membersOptions: string[] = ['Member 1', 'Member 2', 'Member 3', 'Member 4'];
  constructor(private formBuilder: FormBuilder, private route: Router, private http: PctService, private router: ActivatedRoute,private toast:ToastrService) {
    this.childProjectForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      type: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control('', [Validators.required]),
      projectId: this.formBuilder.control(''),
      hours: this.formBuilder.control(0, [Validators.required]),
      status: this.formBuilder.control('', [Validators.required]),
      startDate: this.formBuilder.control('', [Validators.required]),
      endDate: this.formBuilder.control('', [Validators.required]),
      assignee: this.formBuilder.control('', [Validators.required]),
      findType: [null],
      tasks:[null]
      // members: this.formBuilder.control('', [Validators.required]),
    });
  }

  get name(){
    return this.childProjectForm.get('name')
  }
  get type(){
    return this.childProjectForm.get('type')
  }
  get description(){
    return this.childProjectForm.get('description')
  }
  get projectId(){
    return this.childProjectForm.get('projectId')
  }
  get hours(){
    return this.childProjectForm.get('hours')
  }
  get status(){
    return this.childProjectForm.get('status')
  }
  get startDate(){
    return this.childProjectForm.get('startDate')
  }
  get endDate(){
    return this.childProjectForm.get('endDate')
  }
  get assignee(){
    return this.childProjectForm.get('assignee')
  }
   get findType(){
    return this.childProjectForm.get('findType')
  }

  get tasks(){
    return this.childProjectForm.get('tasks')
  }

  onSubmit() {
    if (this.childProjectForm.valid) {
       this.project = this.childProjectForm.value;
      console.log(this.project)
      this.project.projectId=this.parentId1
      this.http.createProject(this.project).subscribe(response => { 
        this.proj=response.response.data;
        console.log(this.proj)
        this.toast.success("Child Project saved Successfully","Info",{
          positionClass:'toast-bottom-right',
          progressBar:true,
          progressAnimation:'increasing',
          timeOut:3000,
          easing:'ease-in',
          easeTime:1000
        })
         }
      , error => console.log(error))
      }
    
  }

  clickToTask() {
    // this.onSubmit();
    
   if (this.p && this.p.id) {
     console.log(this.p.id);
     console.log(this.proj.id);
     this.route.navigate(['/layout/task',{projectId:this.proj.id} ])
     this.toast.success("Child Project saved Successfully and navigated to task","Info",{
      positionClass:'toast-bottom-right',
      progressBar:true,
      progressAnimation:'increasing',
      timeOut:3000,
      easing:'ease-in',
      easeTime:1000
    });
     
   } else {
     console.error('Project ID is missing or undefined');
   }
 }

 ngOnInit(): void {
  


  //  this.router.paramMap.subscribe(params => {
  //     this.parentId1 = params.get('projectId')
  //     console.log(this.parentId1);
  //     this.http.getProjectById(this.parentId1).subscribe((project: Project) => {
  //       this.p = project;
  //       console.log(this.p)
  //     });
  //   });


  // this.router.paramMap.subscribe((params) => {
  //   this.parentId1 = params.get('projectId');
  //   this.childProjectForm.get('projectId')?.setValue(this.parentId1);
  //   this.http.getProjectById(this.parentId1).subscribe((prr:Project)=>{
  //     this.p=prr;
  //     console.log(this.p)
  //   })
  // });
    
 
 
  this.router.paramMap.subscribe((params) => {
    this.parentId1 = params.get('projectId');
    console.log(this.parentId1)
    this.http.getProjectById(this.parentId1).subscribe((response)=>{
      this.p=response.response.data;
      console.log(this.p)
    })
    // this.childProjectForm.get('projectId')?.setValue(this.parentId1);
  });
  this.getProjectById1();
 
}


getProjectById1() {
  if (this.p) {
    this.http.getProjectById(this.p.id).subscribe((response) => {
      this.prjNameOptions = [response.response.data];

      if (this.prjNameOptions.length > 0) {
        this.childProjectForm.get('project')?.setValue(this.prjNameOptions[0].projectId);
        this.childProjectForm.get('project')?.disable();
      }
    });
  } else {
    this.http.getAllParent().subscribe((response) => {
      this.prjNameOptions = response.response.data;
    });
  }
}

getParentProject(projectName:any)
{
  console.log(projectName.target.value)
  this.http.getProjetctByName(projectName.target.value).subscribe((response)=>{
           this.p2=response.response.data; 
           this.parentId1=this.p2.id;       


  })
}



}




















