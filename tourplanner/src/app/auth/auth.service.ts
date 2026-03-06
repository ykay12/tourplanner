import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn = signal(localStorage.getItem('loggedIn') === 'true')


  login(username: String, password: String): Boolean {
    const success = username === "test" && password === "123"

    if (success) {
      this.isLoggedIn.set(true)
      localStorage.setItem('loggedIn', 'true')
      return true
    }
    return false
  }


  logout(){
    this.isLoggedIn.set(false)
    localStorage.removeItem('loggedIn')
  }
}
