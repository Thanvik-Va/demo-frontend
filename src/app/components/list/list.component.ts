import { Component } from '@angular/core';
import { PctService } from 'src/app/services/pct.service'; 
import { Project } from '../classes/project'; 
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ElementRef} from '@angular/core';


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

  constructor(private projectService: PctService, private router: Router, private toaster: ToastrService, private elemRef: ElementRef) { }

  ngOnInit(): void {
    this.projectService.getAll().subscribe(response => {
      this.projects = response.response.data;
      console.log(this.projects);
    });
  }

  loadParentProjects(project: any, index: number): void {
    this.selectedProject = project;
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
    this.isChildProjectsVisible[index] = false;
    this.isParentTasksVisible[index] = !this.isParentTasksVisible[index];
  }

  showChildProjects(index: number): void {
    this.closeOtherProjectsDetails(index);
    this.isParentTasksVisible[index] = false;
    this.isChildProjectsVisible[index] = !this.isChildProjectsVisible[index];
  }


  showChildTasks(index: number) {
    this.isChildTasksVisible[index] = !this.isChildTasksVisible[index];
    for (let i = 0; i < this.isChildTasksVisible.length; i++) {
      if (i !== index) {
        this.isChildTasksVisible[i] = false;
      }
    }
  }



  navigateToUpdateProject(name: string): void {
    this.router.navigate(['/layout/pro', name]);
    this.toaster.success("Naviagted to Update Project", "Info", {
      positionClass: 'toast-bottom-left',
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
      positionClass: 'toast-bottom-left',
      progressBar: true,
      progressAnimation: 'increasing',
      timeOut: 6000,
      easing: 'ease-in',
      easeTime: 3000
    })
  }
}

