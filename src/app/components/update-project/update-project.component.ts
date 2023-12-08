import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PctService } from 'src/app/services/pct.service'; 
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from '../classes/employee';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent {


  projectName: any;
  projectDetails: any;
  updatedDetails:any;
  statusOptions: string[] = ['In Progress', 'Completed', 'On Hold', 'Cancelled'];
  employee:Employee[]=[];

  constructor(private route: ActivatedRoute, private projectService: PctService,private toaster:ToastrService,private router:Router,private emp:EmployeeService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectName = params.get('name');
      console.log(this.projectName)
      this.projectService.getProjetctByName(this.projectName).subscribe(response => {
        this.projectDetails = response.response.data;
        console.log(this.projectDetails)
      });
    });
    this.emp.getEmployeeList().subscribe(data=>{
      this.employee=data;
    })
  }

  updateProject(name:any) {
    this.projectService.updateProject(name).subscribe(response=>{
      this.updatedDetails=response.response.data;
      console.log(this.updatedDetails)
      this.toaster.success("Project Updated Successfully","Info",{
        positionClass:'toast-bottom-left',
        progressBar:true,
        progressAnimation:'increasing',
        timeOut:6000,
        easing:'ease-in',
        easeTime:1000
      })
    })
  }

  navigateBackToList() {
    this.router.navigate(['/layout/list'])
    this.toaster.success("Naviagted back to list of projects","Info",{
      positionClass:'toast-bottom-left',
      progressBar:true,
      progressAnimation:'increasing',
      timeOut:6000,
      easing:'ease-in',
      easeTime:1000
    })
  }


  

  

}
