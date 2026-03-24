import { Routes } from '@angular/router';


import {TourDetailComponent} from './ui/tour-detail/tour-detail.component'
import { CreatetourComponent } from './ui/createtour_screen/createtour.component';
import { LoginComponent } from './ui/login/login.component';
import { RegistrationComponent } from './ui/registration/registration.component';
import { DashboardComponent } from './ui/dashboard_shell/dashboard.component';


export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'createtour', component: CreatetourComponent},

    // temporär zum Testen
  { path: 'test-tour-detail', component: TourDetailComponent }
  ];
