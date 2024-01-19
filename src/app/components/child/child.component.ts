import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../classes/project'; 
import { Router, ActivatedRoute } from '@angular/router';
import { PctService } from 'src/app/services/pct.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../classes/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit{

  childProjectForm!: FormGroup;
  project!: Project;
  parentId1!: any;
  proj!: Project;
  tempId: any;
  employee: Employee[] = [];

  statusOptions: string[] = ['In Progress', 'Completed', 'On Hold', 'Cancelled'];
  leadOptions: string[] = ['Lead 1', 'Lead 2', 'Lead 3', 'Lead 4'];
  membersOptions: string[] = ['Member 1', 'Member 2', 'Member 3', 'Member 4'];
  projectNameOptions:any[]=[];
  p2: any;
  isNavigationInProgress: boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private http: PctService,
    private router: ActivatedRoute,
    private toast: ToastrService,private emp:EmployeeService
  ) {
    this.childProjectForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      description: ['', [Validators.required]],
      projectId: [''],
      hours: [0, [Validators.required]],
      status: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      assignee: ['', [Validators.required]],
      findType: [null],
      tasks: [null]
    });
  }

  get name() {
    return this.childProjectForm.get('name');
  }
  get type() {
    return this.childProjectForm.get('type');
  }
  get description() {
    return this.childProjectForm.get('description');
  }
  get projectId() {
    return this.childProjectForm.get('projectId');
  }
  get hours() {
    return this.childProjectForm.get('hours');
  }
  get status() {
    return this.childProjectForm.get('status');
  }
  get startDate() {
    return this.childProjectForm.get('startDate');
  }
  get endDate() {
    return this.childProjectForm.get('endDate');
  }
  get assignee() {
    return this.childProjectForm.get('assignee');
  }
  get findType() {
    return this.childProjectForm.get('findType');
  }
  get tasks() {
    return this.childProjectForm.get('tasks');
  }

  onSubmit() {
    if (this.childProjectForm.valid) {
      this.project = this.childProjectForm.value;
      this.project.projectId = this.parentId1;
  
      this.http.createProject(this.project).subscribe(
        (response) => {
          this.proj = response.response.data;
          this.tempId = this.proj.id;
  
          this.toast.success("Project saved Successfully", "", {
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing',
            timeOut: 3000,
            easing: 'ease-in',
            easeTime: 1000
          });
          
          // Navigate to task after project creation
          this.navigateToTask();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  
  clickToTask() {
    this.onSubmit();
  }
  
  private navigateToTask() {
    if (this.tempId) {
      if (!this.isNavigationInProgress) {
        this.isNavigationInProgress = true;
  
        this.route.navigate(['/layout/task', { projectId: this.tempId }])
          .then(
            () => {
              this.toast.success("Navigated to task", "", {
                positionClass: 'toast-top-right',
                progressBar: true,
                progressAnimation: 'increasing',
                timeOut: 3000,
                easing: 'ease-in',
                easeTime: 1000
              });
            },
            (error) => {
              console.error('Error navigating to task:', error);
              this.toast.error("Error navigating to task", "Error", {
                positionClass: 'toast-top-right',
                progressBar: true,
                progressAnimation: 'increasing',
                timeOut: 3000,
                easing: 'ease-in',
                easeTime: 1000
              });
            }
          )
          .finally(() => {
            this.isNavigationInProgress = false;
          });
      }
    } else {
      console.error('Error: tempId is not available.');
    }
  }
  
  
  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.parentId1 = params.get('projectId');
      this.http.getProjectById(this.parentId1).subscribe((response) => {
        this.proj = response.response.data;
      });
    });

    this.emp.getEmployeeList().subscribe(data => {
      this.employee = data;
    });

    this.getProjectById1();
  }

  getProjectById1() {
    if (this.proj) {
      this.http.getProjectById(this.proj.id).subscribe((response) => {
        this.projectNameOptions = [response.response.data];
        if (this.projectNameOptions.length > 0) {
          this.childProjectForm.get('project')?.setValue(this.projectNameOptions[0].projectId);
          this.childProjectForm.get('project')?.disable();
        }
      });
    } else {
      this.http.getAllParent().subscribe((response) => {
        this.projectNameOptions = response.response.data;
      });
    }
  }

  getParentProject(projectName: any) {
    this.http.getProjetctByName(projectName.target.value).subscribe((response) => {
      this.p2 = response.response.data;
      this.parentId1 = this.p2.id;
    });
  }
}




















