import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {


  username = signal('')
  email = signal('')
  password = signal('')
  passwordRepeat = signal('')
  errorMsg = signal('')

  constructor(
    private router: Router
  ) { }

  onUsernameInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.username.set(value)
  }
  onEmailInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.email.set(value)
  }

  onPasswordInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.password.set(value)
  }
  onPasswordRepeatInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.passwordRepeat.set(value)
  }


  onRegistration(): void {

    if (!this.username() || !this.email() || !this.password() || !this.passwordRepeat()) {
      this.errorMsg.set('Please fill in all fields.');
      return;
    }

    if (this.password() !== this.passwordRepeat()) {
      this.errorMsg.set('Passwords do not match.');
      return;
    }


    this.errorMsg.set('');
    this.router.navigate(['/login']);
  }

}
