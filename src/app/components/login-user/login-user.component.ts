import { ApiService } from './../../core/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  constructor(private apiService: ApiService,private router: Router) { }

  ngOnInit() {
  }

  public login(user: any){
    this.apiService.login(user).subscribe(data =>{
      this.loginSuccess(data);
    },erro => {
      console.log("Erro no login")
    });
  }

  loginSuccess(data: any) {
    //object html 5 for save user in browser
    localStorage.clear();
    localStorage.setItem("acess_token",data.acess_token);
    localStorage.setItem("refresh_token",data.refresh_token);
    this.apiService.getMainUser(localStorage.getItem("acess_token")).subscribe(user =>{
      this.redirectPage(user);
    },error => {
      console.log("Erro na hora de pegar o usuario");
    })
  
  }
  redirectPage(user: any) {
    localStorage.setItem("currentUser",JSON.stringify(user));
    this.router.navigate(['welcome']);
  }



}
