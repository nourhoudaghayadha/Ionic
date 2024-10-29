import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/auth/authentication.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { firstValueFrom } from 'rxjs';  // Import firstValueFrom

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login = {
    email: "",
    password: "",
  };
  type: boolean = true;

  constructor(
    private authService: AuthenticationService, 
    private authorizationService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  changeType() {
    this.type = !this.type;
  }

  // Updated goToHome method
  async goToHome() {
    console.log('Login button clicked');
    const { email, password } = this.login;

    try {
      // Login the user
      await this.authService.loginUser(email, password);

      // Fetch the user role using firstValueFrom to resolve the Observable
      const userRole = await firstValueFrom(this.authorizationService.getUserRole());
      console.log('User role:', userRole);

      // Navigate based on the user role
      if (userRole === 'chef') {
        this.router.navigate(['/chefdetails']);
      } else {
        this.router.navigate(['/user-home']);
      }
    } catch (error) {
      console.log('Login Error:', error);
    }
  }

  gotoForget() {
    // Implement navigation for forget password
  }

  goToRegister() {
    return this.router.navigate(['/sign-up']);
  }
}
