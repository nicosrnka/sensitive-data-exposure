import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit() : void{

  }

  constructor(private router : Router){}

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  }); 

  submitLogin(){
    console.log(this.loginForm.get("username").value);
    console.log(this.loginForm.get("password").value);

    let loginSuccess = true;

    if(loginSuccess){
      this.router.navigateByUrl("/dashboard");
    }else{
      console.error("failed login");
    }

  }

}
