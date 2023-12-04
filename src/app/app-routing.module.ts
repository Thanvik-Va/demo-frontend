import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutusComponentComponent } from './components/aboutus-component/aboutus-component.component';
import { ContactComponent } from './components/contact/contact.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FolderCardsComponent } from './components/folder-cards/folder-cards.component';
import { LoginForm2Component } from './components/login-form2/login-form2.component';
import { SlideBarComponent } from './components/slide-bar/slide-bar.component';
import { WelcomeHomeComponent } from './components/welcome-home/welcome-home.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AddComponent } from './components/add/add.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { FileUploadComponent } from './components/file-upload-list/file-upload.component';
import { AuthGuard } from './services/auth.guard';
import { RegisterUserComponent } from './components/registeruser/register-user/register-user.component';

// import { AuthGuard } from './services/auth.guard';

const routes: Routes = [

  {path:'home',component:HomeComponent,pathMatch:'full'},
  {path: '',component:LoginComponent,pathMatch:'full'},
  {path: 'login',component:LoginComponent,pathMatch:'full'},
  {path: 'forgot-password',component:ForgotPasswordComponent,pathMatch:'full'},
  {path: 'register',component:RegisterUserComponent,pathMatch:'full'},
  {
  path:"layout",
  component: LayoutComponent,
  children:[
    {path:'dashboard',component:DashboardComponent},
    {path: 'aboutus',component:AboutusComponentComponent,pathMatch:'full'},
    {path: 'contact',component:ContactComponent,pathMatch:'full'},
    {path: 'folder-cards',component:FolderCardsComponent,pathMatch:'full'},
    {path: 'login-form2',component:LoginForm2Component,pathMatch:'full'},
    {path:  'slide-bar',component:SlideBarComponent,pathMatch:'full'},
    {path: 'welcome-home',component:WelcomeHomeComponent,pathMatch:'full'},
    {path:'org-org',component:OrganizationComponent,pathMatch:'full'},
    {path:'add-employee',component:AddComponent},
    {path:'employee-list',component:EmployeeListComponent},
    {path:'file-upload',component:FileUploadComponent}
  ],canActivate:[AuthGuard]
  }
  
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
