import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { FoodService } from 'src/app/service/food.service';
import { AuthService } from 'src/app/service/auth.service';
import { Food } from 'src/app/models/food.model';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/service/order.service';
import { ChefService } from 'src/app/service/chef.service';
import { AlertController } from '@ionic/angular';

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

  selectedCuisine: string[] = []; // Initialize selectedCuisine
  selectedPriceRange: { low: number; high: number } | undefined; // Initialize selectedPriceRange
  selectedDietary: string[] = []; // Initialize selectedDietary
  selectedRating: number | undefined; // Initialize selectedRating
  filteredFoodItems: Food[] = []; // Initialize filteredFoodItems

  constructor(
    private authService: AuthService,
    private foodService: FoodService,
    private orderService: OrderService,
    private chefService: ChefService,
    private alertController: AlertController // Add AlertController to the constructor
  ) {
    this.userName$ = this.authService.getUserName(); // Directly use the Observable from AuthService
  }

  ngOnInit() {
    // Subscribe to get user role
    this.authService.getUserRole().subscribe(role => {
      this.role = role;
      this.featuredFoodItems$ = this.foodService.getFeaturedFoodItems();

      if (this.role === 'user') {
        this.authService.getCurrentUserId().subscribe(userId => {
          if (userId) {
            const userPreferences: string[] = ['vegan', 'low-carb'];
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

  filterFood() {
    if (!this.featuredFoodItems$) return;

    this.featuredFoodItems$.subscribe(foodItems => {
      this.filteredFoodItems = foodItems.filter(food => {
        const matchesCuisine = this.selectedCuisine.length === 0 || this.selectedCuisine.includes(food.category);
        const matchesPrice = !this.selectedPriceRange || (food.price >= this.selectedPriceRange.low && food.price <= this.selectedPriceRange.high);
        const matchesRating = !this.selectedRating || (food.rating !== undefined && food.rating >= this.selectedRating);

        return matchesCuisine && matchesPrice  && matchesRating;
      });
    });
  }

  async presentCuisineAlert() {
    const alert = await this.alertController.create({
      header: 'Choisissez une cuisine',
      inputs: [
        { name: 'fff', type: 'checkbox', label: 'fff', value: 'fff ' },
        { name: 'chinese', type: 'checkbox', label: 'Chinois', value: 'chinese' },
      ],
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        { text: 'OK', handler: (data) => {
            this.selectedCuisine = data;
            this.filterFood(); // Appliquer le filtrage après sélection
          },
        },
      ],
    });
    await alert.present();
  }

  async presentPriceAlert() {
    const alert = await this.alertController.create({
      header: 'Choisissez une plage de prix',
      inputs: [
        { name: 'low', type: 'number', placeholder: 'Prix minimum' },
        { name: 'high', type: 'number', placeholder: 'Prix maximum' },
      ],
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        { text: 'OK', handler: (data) => {
            this.selectedPriceRange = { low: Number(data.low), high: Number(data.high) };
            this.filterFood(); // Appliquer le filtrage après sélection
          },
        },
      ],
    });
    await alert.present();
  }

  async presentDietaryAlert() {
    const alert = await this.alertController.create({
      header: 'Choisissez les restrictions alimentaires',
      inputs: [
        { name: 'vegan', type: 'checkbox', label: 'Vegan', value: 'vegan' },
        { name: 'glutenFree', type: 'checkbox', label: 'Sans gluten', value: 'glutenFree' },
        { name: 'nutFree', type: 'checkbox', label: 'Sans noix', value: 'nutFree' },
      ],
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        { text: 'OK', handler: (data) => {
            this.selectedDietary = data;
            this.filterFood(); // Appliquer le filtrage après sélection
          },
        },
      ],
    });
    await alert.present();
  }

  async presentRatedAlert() {
    const alert = await this.alertController.create({
      header: 'Choisissez une note minimale',
      inputs: [
        { name: 'rating', type: 'radio', label: '1 étoile', value: '1' },
        { name: 'rating', type: 'radio', label: '2 étoiles', value: '2' },
        { name: 'rating', type: 'radio', label: '3 étoiles', value: '3' },
        { name: 'rating', type: 'radio', label: '4 étoiles', value: '4' },
        { name: 'rating', type: 'radio', label: '5 étoiles', value: '5' },
      ],
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        { text: 'OK', handler: (data) => {
            this.selectedRating = Number(data);
            this.filterFood(); 
          },
        },
      ],
    });
    await alert.present();
  }
  
  logout() {
    this.authService.logout();
  }

  increaseQuantity(food: any) {
    if (!food.quantity) {
      food.quantity = 1;
    }
    food.quantity++;
  }
  
  decreaseQuantity(food: any) {
    if (food.quantity && food.quantity > 1) {
      food.quantity--;
    }
  }
  
  orderFood(food: Food) {
    const quantity = food.quantity || 1; // Définit une quantité par défaut à 1 si aucune n'est saisie
    const details = food.description; // Par exemple, utilisez la description comme détail
    
    // Appel de la méthode `addOrder` du service pour ajouter la commande dans Firebase
    this.foodService.addOrder(food.id, food.name, quantity, details).subscribe(
      (response) => {
        console.log('Commande enregistrée avec succès:', response);
        this.presentOrderConfirmation(food, quantity);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de la commande:', error);
      }
    );
  }
  
  async presentOrderConfirmation(food: Food, quantity: number) {
    const alert = await this.alertController.create({
      header: 'Commande confirmée',
      message: `Vous avez commandé ${quantity} portions de ${food.name}.`,
      buttons: ['OK']
    });
    await alert.present();
  }
  
  
}
