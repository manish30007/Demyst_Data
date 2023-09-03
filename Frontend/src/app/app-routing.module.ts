import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth-gaurd.service';
const routes: Routes = [
 
{ path: '', redirectTo: '/dashboard', pathMatch: 'full'},
{ path: 'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
{ path: 'login', component:LoginComponent},
{ path: 'register', component:RegisterComponent}
 
    ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
