import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FoodService } from 'src/app/service/food.service';
import { AuthService } from 'src/app/service/auth.service';
import { Food } from 'src/app/models/food.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chef-home',
  templateUrl: './chef-home.page.html',
  styleUrls: ['./chef-home.page.scss'],
})
export class ChefHomePage implements OnInit, OnDestroy {
  chefFoodItems$: Observable<Food[]> | null = null;
  role: string | null = null;
  private subscriptions: Subscription = new Subscription();
  food: Food | null = null;

  constructor(
    private authService: AuthService,
    private foodService: FoodService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to user role
    const roleSubscription = this.authService.getUserRole().subscribe((role) => {
      this.role = role;

      if (role === 'chef') {
        this.loadChefFoodItems();
      }
    });

    this.subscriptions.add(roleSubscription);
  }

  // Function to handle update of a food item
  onEdit(food: Food) {
    console.log('Navigating to update-food for ID:', food.id); // Debugging log
    this.router.navigate(['/update-food', food.id]);
  }
  
  

  loadChefFoodItems(): void {
    const userIdSubscription = this.authService.getCurrentUserId().subscribe(
      (userId) => {
        if (userId) {
          this.fetchChefFoodItems(userId);
        } else {
          console.error('User ID is null. Cannot fetch food items.');
        }
      },
      (error) => console.error('Error fetching user ID:', error)
    );

    this.subscriptions.add(userIdSubscription);
  }

  fetchChefFoodItems(chefId: string): void {
    this.chefFoodItems$ = this.foodService.getLatestChefFoodItems(chefId);

    this.chefFoodItems$.subscribe(
      (items) => console.log('Food Items:', items),
      (error) => console.error('Error fetching food items:', error)
    );
  }

  navigateToAddFood(): void {
    this.router.navigate(['/add-food']);
  }

  logout(): void {
    this.authService.logout();
  }

  async presentToast(message: string): Promise<void> {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = 2000;
    document.body.appendChild(toast);
    await toast.present();
  }

  ngOnDestroy(): void {
    // Clean up all subscriptions
    this.subscriptions.unsubscribe();
  }
}
