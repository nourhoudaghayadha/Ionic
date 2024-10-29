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
})
export class ChefHomePage implements OnInit {
  chefFoodItems$: Observable<Food[]> | null = null; // Initialize as null
  role: string | null = null;

  constructor(
    private authService: AuthService,
    private foodService: FoodService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.authService.getUserRole().subscribe((role) => {
        this.role = role;
        if (this.role === 'chef') {
          this.authService.getCurrentUserId().subscribe((userId) => {
            if (userId) {
              this.fetchChefFoodItems(userId);
            } else {
              console.error('User ID is null. Cannot fetch food items.');
            }
          });
        }
      });
    } catch (error) {
      console.error('Error in initialization:', error);
    }
  }

  fetchChefFoodItems(chefId: string) {
    this.chefFoodItems$ = this.foodService.getLatestChefFoodItems(chefId);

    this.chefFoodItems$.subscribe(
      (items) => console.log('Food Items:', items),
      (error) => console.error('Error fetching food items:', error)
    );
  }

  navigateToAddFood() {
    this.router.navigate(['/add-food']);
  }

  logout() {
    this.authService.logout();
  }
}
