import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http-service'
import hash from 'object-hash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private router: Router, private http: HttpService) { }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  async submitLogin() {
    var loginReturn = await this.http.login(this.loginForm.get("username").value, hash(this.loginForm.get("password").value)).catch(err => {
      console.log("error");
    });

    if (loginReturn) {
      localStorage.setItem("token", loginReturn.token);
      localStorage.setItem("id", loginReturn.id);
      localStorage.setItem("isLoggedIn", "true");
      this.router.navigateByUrl("/dashboard/info");
    } else {
      console.error("failed login");
    }
  }
}
