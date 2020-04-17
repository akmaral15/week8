import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hh-front';

  logged: boolean = false

  constructor(private authService: AuthService) {}
  
  userModel = {
    username: '',
    password: ''
  }

  ngOnInit() {
    let token = localStorage.getItem('token')
    if(token) {
      this.logged = true
    }
  }

  onLogin() {
    this.authService.login(this.userModel).subscribe(
      res => {
        //  console.log(res)
        localStorage.setItem('token', res.token)
        this.logged = true

        this.userModel.password = '',
        this.userModel.username = ''
      }
    )
  }

  onLogout() {
    localStorage.clear()
    this.logged = false
  }
}