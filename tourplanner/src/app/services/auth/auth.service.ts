import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }



  login(username: string, password: string): boolean {
    const success = username === "test" && password === "123"

    if (success) {
      return true
    }
    return false
  }


  logout() {
  }
}
