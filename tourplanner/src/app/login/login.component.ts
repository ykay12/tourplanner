import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

   username = signal('')
   password = signal('')
   errorMsg = signal('')

   constructor(
    private authService: AuthService,
    private router: Router
   ){}

  onUsernameInput(event: Event): void{
      const value = (event.target as HTMLInputElement).value
      this.username.set(value)
  }

  onPasswordInput(event: Event): void{
    const value = (event.target as HTMLInputElement).value
    this.password.set(value)
  }


  onLogin() : void{
    const succes: Boolean = this.authService.login(this.username(), this.password())

    if(succes){
      this.errorMsg.set('')
      this.router.navigate(['/'])
    } else{
      this.errorMsg.set("Whoops, something went wrong. Please try again.")
    }
  }
}
