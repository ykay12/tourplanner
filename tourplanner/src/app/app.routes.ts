import { Routes } from '@angular/router';
import { LoginComponent} from './login/login.component'
import { RegistrationComponent} from './registration/registration.component'

//temporär zum Testen
import {TourDetailComponent} from './features/tours/tour-detail/tour-detail.component'
//

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent},

    // temporär zum Testen
  { path: 'test-tour-detail', component: TourDetailComponent }
  ];
