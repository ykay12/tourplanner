//app.routes.ts

import { Routes } from '@angular/router';


import { TourDetailComponent } from './ui/loggedIn_shell/tour-detail/tour-detail.component'
import { CreatetourComponent } from './ui/loggedIn_shell/createtour_screen/createtour.component';
import { LoginComponent } from './ui/login/login.component';
import { RegistrationComponent } from './ui/registration/registration.component';
import { DashboardComponent } from './ui/loggedIn_shell/loggedIn_shell.component';
import { DashboardHomeComponent } from './ui/loggedIn_shell/dashboard-home/dashboard-home.component';
import { ToursOverviewComponent } from './ui/loggedIn_shell/tours-overview-screen/tours-overview.component';
import { EditTourComponent } from './ui/loggedIn_shell/edit-tour/edit-tour.component';

import { authGuard } from './services/auth/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard], 
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'createtour', component: CreatetourComponent },
      { path: 'tours-overview', component: ToursOverviewComponent },
      { path: 'tour-detail', component: TourDetailComponent },
      { path: 'edit-tour/:id', component: EditTourComponent },
    ]
  }

];
