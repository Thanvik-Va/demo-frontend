import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {
  //implements OnInit

  

  sidebarOpened = false;

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

  // data:any=[
  //   {
  //     name:'Basava',
  //     age :26,
  //     email:"basava@gmail.com",
  //     address:"@raichur",
  //     mobile_number:7483513024
  //   },
  //   {
  //     name :'Kiran',
  //     age : 25,
  //     email:"kiran@gmail.com",
  //     address:"@hyd",
  //     mobile_number:9483513067
  //   },
  //   {
  //     name : 'suresh',
  //     age : 27,
  //     email:"suresh@gmail.com",
  //     address:"@bengalore",
  //     mobile_number:9483513056
  //   }
  //  ];

  // ngOnInit() {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     // Redirect to login or perform desired action
  //   }
  //  }

   //-------------------------second--------

   constructor(private service:LoginServiceService, private route:ActivatedRoute){}
   token:string|null=null;
 
   userEmail !:string;

  userDetails:any;
 
  //  ngOnInit(){
  //    this.getUser();
  //    this.userEmail = this.route.snapshot.params['userEmail'];

  //  }
  //  getUser(){
  //    this.service.getUserDetails().subscribe(
  //      (response)=>{
  //        this.userDetails=response;
  //      },
  //      (error)=>{
  //        console.log(error);
  //      }
  //    )
  //  }
 
  

}
