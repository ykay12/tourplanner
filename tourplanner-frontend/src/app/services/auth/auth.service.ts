import { inject, Injectable, signal } from '@angular/core';
import { AppStateService } from '../../states/app-state.service';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, tap } from 'rxjs';
import { LoginResponse } from '../../types/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient); //this is needed to make a http-request
  private baseUrl = 'http://localhost:8080'; //standard-port Spring-Boot

  constructor(private appState: AppStateService) {
  }



  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, {
      username, password
    }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        this.appState.logUserIn(response.userId);
      })
    );
  }

  register(username: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth/register`, {
      username, email, password
    })
  }


  logout() {
    localStorage.removeItem('token');
    this.appState.logUserOut();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

}
