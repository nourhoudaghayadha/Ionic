import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/service/food.service';
import { AuthService } from 'src/app/service/auth.service';
import { Food } from 'src/app/models/food.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chef-home',
  templateUrl: './chef-home.page.html',
  styleUrls: ['./chef-home.page.scss'],
})export class ChefHomePage implements OnInit {
  chefFoodItems$: Observable<Food[]>;
  role: string | undefined;

  constructor(
    private authService: AuthService,
    private foodService: FoodService,
    private router: Router
  ) {
    this.chefFoodItems$ = this.foodService.getLatestChefFoodItems();
  }

  async ngOnInit() {
    this.role = await this.authService.getUserRole(); // Fetch user role from AuthService
  }

  navigateToAddFood() {
    this.router.navigate(['/add-food']);
  }

  logout() {
    this.authService.logout();
  }
}
