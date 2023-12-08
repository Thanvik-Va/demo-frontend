import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PctService } from 'src/app/services/pct.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-parent-task',
  templateUrl: './update-parent-task.component.html',
  styleUrls: ['./update-parent-task.component.css']
})
export class UpdateParentTaskComponent implements OnInit {

  taskName:any;
  details:any;
  updatedDetails:any;
  constructor(private route:ActivatedRoute,private service:PctService,private router:Router,private toaster:ToastrService){}
 
  ngOnInit(){
    this.route.paramMap.subscribe(params=>{
      this.taskName=params.get('name');
      console.log(this.taskName);
      this.service.getParentTasksByName(this.taskName).subscribe(response=>{
        this.details=response.response.data;
        console.log(this.details.name )
      })
   
    })
  }

  updateTask(name:any){
    console.log(this.details.name)
    this.service.updateParentTasks(this.details).subscribe(response=>{
      this.updatedDetails=response.response.data;
      console.log(this.updatedDetails)
      this.toaster.success("Task Updated Successfully","Info",{
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
