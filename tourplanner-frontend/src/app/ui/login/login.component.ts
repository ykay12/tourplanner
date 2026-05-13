import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
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
  ) { }

  onUsernameInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.username.set(value)
  }

  onPasswordInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.password.set(value)
  }


  onLogin(): void {
    this.authService.login(this.username(), this.password()).subscribe({
      next: () => {
        this.errorMsg.set('');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMsg.set('Whoops, something went wrong. Please try again.');
      }
    });
  }
}
