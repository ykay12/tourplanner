import { Injectable, signal } from '@angular/core';
import { AppStateService } from '../../states/app-state.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private appState: AppStateService) {
  }



  login(username: string, password: string): boolean {
    const success = username === "test" && password === "123"

    if (success) {
      this.appState.logUserIn()
      return true
    }
    return false
  }


  logout() {
    this.appState.logUserOut()
  }
}
