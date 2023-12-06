import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { saveAs } from 'file-saver';//we need to install 'file-saver' from npm as -> npm install file-saver
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit{
  selectedFile: File | null = null;
  msg='';
  msgF='';
isValidFileType=true;
 files: any[] = [];
 index:number=1;
 loadFilesFailed:boolean=false;

  constructor(private fileService: FileService,private toaster:ToastrService) {}

  
  ngOnInit(): void {

    // const token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaXZhYmFidUBnbWFpbC5jb20iLCJpYXQiOjE3MDEyNDE2NTgsImV4cCI6MTcwMTI1OTY1OH0.EmFqrfHvNhos0ggxyWX_LMZbunjXRsNICRqaj7aNe4JQywpnZ_av4XNQaaIGnhLY_j_dUHq-7aj7x-pq_q72tw';
    // localStorage.setItem('token',token);

    //list of files
    // this.fileService.getFiles().subscribe(
    //   (response: any) => {
    //     console.log(response.response.data);
    //     this.files = response.response.data;
    //   },
    //   (error) => {
    //     console.error(error);
        
    //   }
    // );

    this.updateList();
  
  }

  //downloading file
  downloadFile(fileName: string) {
    this.fileService.downloadFile(fileName).subscribe(
      (response:any) => {
        const blob = new Blob([response], { type: response.type });
        saveAs(blob, fileName);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //uploading a file

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      if (
        this.selectedFile.type !== 'application/vnd.ms-excel' &&
        this.selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {

       this.isValidFileType=false;
       console.error('Invalid file type. Only XLS and XLSX files are allowed.');

      //  this.toaster.error('Invalid file type','Error',{
      //   positionClass:'toast-top-right'
      //  })

       // this.selectedFile = null;
       // this.msg='Only XLS and XLSX files are allowed'  
      }
      else{
        this.isValidFileType=true;
      }
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          console.log(response);
          if(response.errorCode===20){
         // this.msg=response.message;
         // this.msgF='';

          this.toaster.success(`${response.message}`,'Success',{
            positionClass:'toast-top-right'
          })
          }
          else if(response.errorCode===302){
           // this.msgF=response.message;
           // this.msg='';

            this.toaster.error(`${response.message}`,'Error',{
              positionClass:'toast-top-right'
            })
          }
          else if(response.errorCode===51){
          //  this.msgF=response.message;
           // this.msg='';

            this.toaster.error(`${response.message}`,'Error',{
              positionClass:'toast-top-right'
            })
          }
          else{
           // this.msgF='File upload failed!';
           // this.msg='';

            this.toaster.error('Somthing went wrong!','Error',{
              positionClass:'toast-top-right'
            })
          }

          //updating file-list
          // this.fileService.getFiles().subscribe(
          //   (response: any) => {
          //     this.files = response.response.data;
          //   })

          this.updateList();
        },
        
        (error) => {
          console.error(error);
          // if(error.status===302){
          //   this.msgF='File with same "NAME" already exist!';
          //   this.msg='';
          // }
          // else{
          //   this.msgF='File upload failed!';
          //   this.msg='';
          // }

          this.toaster.error('Unable to connect server try again!','Error',{
            positionClass:'toast-top-right'
          })
        }
      );
    }
    
  }

  //updating file list
  
  updateList(){
    this.fileService.getFiles().subscribe(
      (response: any) => {
        if(response.errorCode==20){
          this.files = response.response.data;
        }
       else if(response.errorCode==50){
        console.log(response.message)
         this.loadFilesFailed=true;
       }
      })
      
  }
  
}
