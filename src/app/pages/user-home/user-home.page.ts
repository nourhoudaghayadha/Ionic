import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { FoodService } from 'src/app/service/food.service';
import { AuthService } from 'src/app/service/auth.service';
import { Food } from 'src/app/models/food.model';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/service/order.service';
import { ChefService } from 'src/app/service/chef.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {
  role: string | undefined;
  userName$: Observable<string>;
  featuredFoodItems$: Observable<Food[]> | undefined;
  recommendedFoodItems$: Observable<Food[]> | undefined;
  recentOrders$: Observable<Order[]> | undefined;
  topChefs$: Observable<any[]> | undefined;

  selectedFoodId: string | undefined; // Selected food ID for rating
  rating: number = 0; // User-inputted rating

  constructor(
    private authService: AuthService,
    private foodService: FoodService,
    private modalController: ModalController,
    private chefService: ChefService,
    private orderService: OrderService
  ) {
    this.userName$ = this.authService.getUserName(); // Directly use the Observable from AuthService
  }

  ngOnInit() {
    // Subscribe to get user role
    this.authService.getUserRole().subscribe(role => {
      this.role = role;
      this.featuredFoodItems$ = this.foodService.getFeaturedFoodItems();

      if (this.role === 'user') {
        // Get user preferences from AuthService or set a default
        this.authService.getCurrentUserId().subscribe(userId => {
          if (userId) {
            // Get user preferences from some service or make an assumption
            const userPreferences: string[] = ['vegan', 'low-carb']; // Replace this with actual user preferences if available
            this.recommendedFoodItems$ = this.foodService.getRecommendedFoodItems(userPreferences);
            this.recentOrders$ = this.orderService.getUserRecentOrders(userId);
          }
        });
      } else if (this.role === 'chef') {
        this.topChefs$ = this.chefService.getTopChefs();
      }
    });
  }


  // async openFoodDetail(food: Food) {
  //   const modal = await this.modalController.create({
  //     component: FoodDetailModalComponent,
  //     componentProps: { food }
  //   });
  //   await modal.present();
  // }

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
