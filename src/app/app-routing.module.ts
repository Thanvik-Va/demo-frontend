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
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { FileUploadComponent } from './components/file-upload-list/file-upload.component';
import { AuthGuard } from './services/auth.guard';
import { RegisterUserComponent } from './components/registeruser/register-user/register-user.component';
import { ListComponent } from './components/list/list.component';
import { ChildComponent } from './components/child/child.component';
import { ProjectComponent } from './components/project/project.component';
import { TaskComponent } from './components/task/task.component';
import { UpdateParentTaskComponent } from './components/update-parent-task/update-parent-task.component';
import { UpdateProjectComponent } from './components/update-project/update-project.component';
import { ProjectHeaderComponent } from './components/project-header/project-header.component';
import { SendemailforgotpasswordComponent } from './components/sendemailforgotpassword/sendemailforgotpassword.component';
import { NotfoundComponent } from './components/notfound/notfound.component';


const routes: Routes = [

  {path:'home',component:HomeComponent,pathMatch:'full'},
  {path: '',component:LoginComponent,pathMatch:'full'},
  {path: 'login',component:LoginComponent,pathMatch:'full'},
  {path: 'forgot-password',component:ForgotPasswordComponent,pathMatch:'full'},
  {path: 'register',component:RegisterUserComponent,pathMatch:'full'},
  {path:'send-email',component:SendemailforgotpasswordComponent},
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
    {path:'employee-list',component:EmployeeListComponent},
    {path:'file-upload',component:FileUploadComponent},
    {path:'list',component:ListComponent},
    {path:'project',component:ProjectComponent},
    {path:'project/:projectId',component:ProjectComponent},
    {path:'child',component:ChildComponent},
    {path:'child/:projectId',component:ChildComponent},
    {path:'task',component:TaskComponent},
    {path:'task/:projectId',component:TaskComponent},
    {path:'project/:name',component:ProjectComponent},
    {path:'task/:name',component:TaskComponent},
    {path:'project-header',component:ProjectHeaderComponent},
    {path:'pro/:name',component:UpdateProjectComponent},
    {path:'update/:name',component:UpdateParentTaskComponent},
   
  ],canActivate:[AuthGuard]
  },
  {path:'**',component:NotfoundComponent}
  
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
