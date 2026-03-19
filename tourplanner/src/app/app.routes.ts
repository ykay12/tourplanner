import { Routes } from '@angular/router';
import { LoginComponent} from './login/login.component'
import { RegistrationComponent} from './registration/registration.component'
import { DashboardComponent } from './dashboard/dashboard.component';

//temporär zum Testen
import {TourDetailComponent} from './features/tours/tour-detail/tour-detail.component'
import { CreatetourComponent } from './createtour/createtour.component';
//

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'createtour', component: CreatetourComponent},

    // temporär zum Testen
  { path: 'test-tour-detail', component: TourDetailComponent }
  ];
