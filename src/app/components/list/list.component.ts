import { Component } from '@angular/core';
import { PctService } from 'src/app/services/pct.service'; 
import { Project } from '../classes/project'; 
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ElementRef} from '@angular/core';
import DataTable from 'datatables.net-dt';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations:[
    trigger('fade',[
      
      transition('void=>*',[
        style({backgroundColor:'green',opacity:1}),
        animate(3000)
      ])
    ])
  ]
})
export class ListComponent {
  isChildProjectsVisible: boolean[] = [];
  isParentTasksVisible: boolean[] = [];
  isChildTasksVisible: boolean[] = [];
  projects: any[] = [];
  selectedProject: any;
  isDetailsOpen: boolean[] = [];
  isChildProjectTasksChecked: boolean = false;
  childTasks: any;
  dataTable:any;
  constructor(private projectService: PctService, private router: Router, private toaster: ToastrService, private elemRef: ElementRef) { }

  ngOnInit(): void {
    this.projectService.getAll().subscribe(response => {
      this.projects = response.response.data;
     
    
      console.log(this.projects);
    });
    


    
      
  }

  ngAfterViewInit(): void {
    console.log("Hiiiooo")
   
  }

  loadParentProjects(project: any, index: number): void {
    this.selectedProject = project;
    setTimeout(() => {
      this.dataTable = new DataTable('#maintable', {
        lengthMenu: [1,3,5],
        paging: true,
        searching: true,
      
     
        // ... other options
      });
      console.log('DataTable initialized successfully.');
    }, 0);
    this.isDetailsOpen[index] = !this.isDetailsOpen[index];
  }


  closeOtherProjectsDetails(index: number): void {
    for (let i = 0; i < this.isDetailsOpen.length; i++) {
      if (i !== index) {
        this.isDetailsOpen[i] = false;
      }
    }
  }


  showParentTasks(index: number): void {
    this.closeOtherProjectsDetails(index);
    setTimeout(() => {
      this.dataTable = new DataTable('#parentTaskTable', {
        lengthMenu: [1,3,5],
        paging: true,
        searching: true,
        // ... other options
      });
      console.log('DataTable initialized successfully.');
    }, 1000);
    this.isChildProjectsVisible[index] = false;
    this.isParentTasksVisible[index] = !this.isParentTasksVisible[index];
  }

  showChildProjects(index: number): void {
    this.closeOtherProjectsDetails(index);
    setTimeout(() => {
      this.dataTable = new DataTable('#childTable', {
        lengthMenu: [1,3,5],
        paging: true,
        searching: true,
        // ... other options
      });
      console.log('DataTable initialized successfully.');
    }, 1000);
    this.isParentTasksVisible[index] = false;
    this.isChildProjectsVisible[index] = !this.isChildProjectsVisible[index];
  }


  showChildTasks(index: number) {
    this.isChildTasksVisible[index] = !this.isChildTasksVisible[index];
    setTimeout(() => {
      this.dataTable = new DataTable('#mytbl1', {
        lengthMenu: [1,3,5],
        paging: true,
        searching: true,
        // ... other options
      });
      console.log('DataTable initialized successfully.');
    }, 1000);
    for (let i = 0; i < this.isChildTasksVisible.length; i++) {
      if (i !== index) {
        this.isChildTasksVisible[i] = false;

      }
    }
  }



  navigateToUpdateProject(name: string): void {
    this.router.navigate(['/layout/pro', name]);
    this.toaster.success("Naviagted to Update Project", "Info", {
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'increasing',
      timeOut: 6000,
      easing: 'ease-in',
      easeTime: 1000
    })
  }

  navigateToUpdateTask(name: string): void {
    console.log(name)
    this.router.navigate(['/layout/update', name]);
    this.toaster.success("Naviagted to Update Task", "Info", {
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'increasing',
      timeOut: 6000,
      easing: 'ease-in',
      easeTime: 3000
    })
  }
  deleteProject(id:any){
    this.projectService.deleteProject(id).subscribe(response=>{
      console.log(response);
      window.location.reload();
    })
  }


  deleteTask(id: any) {
    this.projectService.deleteTask(id).subscribe(response=>{
      console.log(response);
      window.location.reload();
      
    })
    }
}

