import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Chef } from 'src/app/models/chef.model';
import { Food } from 'src/app/models/food.model';
import { Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/service/auth.service';
import { ChefService } from 'src/app/service/chef.service';
import { FoodService } from 'src/app/service/food.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.page.html',
  styleUrls: ['./first-page.page.scss'],
})
export class FirstPagePage implements OnInit {
  role: string | undefined;
  userName$: Observable<string>;
  featuredFoodItems$: Observable<Food[]> | undefined;
  recommendedFoodItems$: Observable<Food[]> | undefined;
  recentOrders$: Observable<Order[]> | undefined;
  topChefs$: Observable<Chef[]> | undefined;

  selectedFoodId: string | undefined; // Selected food ID for rating
  rating: number = 0; // User-inputted rating

  constructor(
    private authService: AuthService,
    private foodService: FoodService,
    private orderService: OrderService,
    private chefService: ChefService
  ) {
    this.userName$ = from(this.authService.getUserName());
  }

  async ngOnInit() {
    // this.role = await this.authService.getUserRole();
    this.featuredFoodItems$ = this.foodService.getFeaturedFoodItems();

    if (this.role === 'user') {
      const userPreferences: string[] = ['vegan', 'low-carb'];
      this.recommendedFoodItems$ = this.foodService.getRecommendedFoodItems(userPreferences);
      const userId = await this.authService.getCurrentUserId();
      if (userId) {
        // this.recentOrders$ = this.orderService.getUserRecentOrders(userId);
      }
    } else if (this.role === 'chef') {
      this.topChefs$ = this.chefService.getTopChefs();
    }
  }

  submitRating() {
    if (this.selectedFoodId && this.rating > 0) {
      this.foodService.addRating(this.selectedFoodId, this.rating).subscribe({
        next: () => {
          alert('Rating submitted successfully!');
          this.rating = 0; // Reset the rating input
        },
        error: (err) => {
          console.error('Failed to submit rating:', err);
        },
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
