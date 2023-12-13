import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../classes/project'; 
import { PctService } from 'src/app/services/pct.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../classes/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Observable, map, throwError } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit{
  projectForm!: FormGroup;
  project!: Project;
  statusOptions: string[] = ['In Progress', 'Completed', 'On Hold', 'Cancelled'];
  projectOptions: any[] = []
  leadOptions: string[] = [];
  all: any[] = [];
  employee: Employee[] = [];
  tempId: any;

  constructor(private fb: FormBuilder, private dataService: PctService, private router: Router, private toast: ToastrService,private emp:EmployeeService) {
    this.projectForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      type: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      projectId: this.fb.control(''),
      hours: this.fb.control(0, [Validators.required]),
      status: this.fb.control('', [Validators.required]),
      startDate: this.fb.control('', [Validators.required]),
      endDate: this.fb.control('', [Validators.required]),
      assignee: this.fb.control('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.dataService.getAllParent().subscribe(response => {
      this.projectOptions = response.response.data;
      console.log(response)
    })

    this.dataService.getAll().subscribe(response => {
      this.all = response.response.data;
      console.log(response)
    })

    this.emp.getEmployeeList().subscribe(response => {
      this.employee = response;
      console.log(this.leadOptions)
    })
  }

  get name() {
    return this.projectForm.get("name")
  }
  get type() {
    return this.projectForm.get("type")
  }
  get description() {
    return this.projectForm.get("description")
  }
  get projectId() {
    return this.projectForm.get("projectId")
  }
  get hours() {
    return this.projectForm.get("hours")
  }
  get status() {
    return this.projectForm.get("status")
  }
  get startDate() {
    return this.projectForm.get("startDate")
  }
  get endDate() {
    return this.projectForm.get("endDate")
  }
  get assignee() {
    return this.projectForm.get("assignee")
  }

  onSubmit(): Observable<any> {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
      return this.dataService.createProject(formData).pipe(
        map(response => response?.response?.data)
      );
    } 
    else {
        return throwError('Form is not valid');
    }
  }



  clickToChild() {
    this.onSubmit().subscribe(
      (project) => {
        if (project) {
          this.tempId = project.id;
          this.router.navigate(['/layout/child', { projectId: this.tempId }]);
          this.toast.success("Project saved successfully and navigated to create child project", "Info", {
            positionClass: 'toast-bottom-top',
            progressBar: true,
            progressAnimation: 'increasing',
            timeOut: 2000,
            easing: 'ease-in',
            easeTime: 1000
          });
        } else {
          console.error('Error: Unable to retrieve project details.');
          this.toast.error("Error in navigating to sub project", "Info", {
            positionClass: 'toast-bottom-top',
            progressBar: true,
            progressAnimation: 'increasing',
            timeOut: 2000,
            easing: 'ease-in',
            easeTime: 1000
          });
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  
  clickToTask() {
    this.onSubmit().subscribe(
      (project) => {
        if (project) {
          this.tempId = project.id;
          this.router.navigate(['/layout/task', { projectId: this.tempId }]);
          this.toast.success(
            "Project saved successfully and navigated to create task",
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
        } else {
          console.error('Error: Unable to retrieve project details.');
        }
      },
      (error) => {
        console.error('Error:', error);
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

  createChild() {
    this.router.navigate(['/layout/child'])
  }

  createTask() {
    this.router.navigate(['/layout/task'])
  }

}
