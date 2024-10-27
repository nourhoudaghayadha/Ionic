import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/auth/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login={
    email:"",
    password:"",
  };
  type:boolean=true;
  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {
  }
  changeType() {
    this.type=!this.type;
  }
  goToHome() {
    const { email, password } = this.login;
    this.authService.loginUser(email, password)
      .then(() => this.router.navigate(['/home']))
      .catch(err => console.log('Erreur de connexion:', err));
  }

  gotoForget(){

  }

  twitterLogin(){

  }
  gmailLogin(){

  }
  facebookLogin(){}
  faceLogin(){}
  touchLogin(){}
  goToRegister(){
    return this.router.navigate(['/sign-up'])
      
  }
  
}
