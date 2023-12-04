import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { HttpClientModule } from '@angular/common/http'
import { MatMenuModule } from '@angular/material/menu'
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { AboutusComponentComponent } from './components/aboutus-component/aboutus-component.component';
import { ContactComponent } from './components/contact/contact.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FolderCardsComponent } from './components/folder-cards/folder-cards.component';
import { LoginForm2Component } from './components/login-form2/login-form2.component';
import { SlideBarComponent } from './components/slide-bar/slide-bar.component';
import { WelcomeHomeComponent } from './components/welcome-home/welcome-home.component';
import { LoginServiceService } from './services/login-service.service';
import { HttpClient } from '@angular/common/http';

import { OrganizationComponent } from './components/organization/organization.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { LayoutComponent } from './layout/layout/layout.component';
import { AddComponent } from './components/add/add.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from './components/file-upload-list/file-upload.component';
import { RegisterUserComponent } from './components/registeruser/register-user/register-user.component';
  //import {FormControl} from '@angular/forms'



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    AboutusComponentComponent,
    ContactComponent,
    ForgotPasswordComponent,
    FolderCardsComponent,
    LoginForm2Component,
    SlideBarComponent,
    WelcomeHomeComponent,
    

    OrganizationComponent,
    LayoutComponent,
    AddComponent,
    EmployeeListComponent,
    
    FileUploadComponent,
          RegisterUserComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    FormsModule,
    MatListModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    //  AddComponent,
    // EmployeeListComponent,
    ReactiveFormsModule,
    FormsModule
    // FormControl

  ], 
  providers: [LoginServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
