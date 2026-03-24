//dashboard.component.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FormsModule],
  templateUrl: './loggedIn_shell.component.html',
  styleUrl: './loggedIn_shell.component.scss'
})
export class DashboardComponent {}
