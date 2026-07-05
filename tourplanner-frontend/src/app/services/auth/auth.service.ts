import { inject, Injectable } from '@angular/core';
import { AppStateService } from '../../states/app-state.service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../../types/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient); //this is needed to make a http-request
  private baseUrl = 'http://localhost:8080';

  constructor(private appState: AppStateService) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, {
      username, password
    }).pipe(
      tap((response) => {
        // Token und userId in localStorage speichern,
        // damit die Session nach einem Page-Refresh wiederhergestellt werden kann.
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', String(response.userId));
        this.appState.logUserIn(response.userId);
      })
    );
  }

  register(username: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth/register`, {
      username, email, password
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.appState.logUserOut();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

}