import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/service/food.service';
import { ToastService } from 'src/app/service/toast.service'; // Import ToastService

@Component({
  selector: 'app-update-food',
  templateUrl: './update-food.page.html',
})
export class UpdateFoodPage implements OnInit {
  food: Food = {
    id: '', name: '', description: '', price: 0, category: '', dietaryTags: [], imageUrl: '',
    chefId: ''
  };
  categories = ['Pizza', 'Burger', 'Salad', 'Dessert']; // Example categories
  dietaryTags = ['Vegan', 'Gluten-Free', 'Nut-Free']; // Example dietary tags
  selectedImage: File | null = null;

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute,
    private router: Router, // Inject Router
    private toastService: ToastService // Inject ToastService
  ) {}

  ngOnInit() {
    const foodId = this.route.snapshot.paramMap.get('id');
    if (foodId) {
      this.foodService.getFoodById(foodId).subscribe((food: any) => {
        this.food = food;
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedImage = input.files[0];
    }
  }

  formatPrice(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    input.value = value.toFixed(2);
  }

  onSubmit(form: any) {
    if (this.selectedImage) {
      this.foodService.uploadImage(this.selectedImage).subscribe((url: any) => {
        this.food.imageUrl = url;
        this.updateFoodItem();
      });
    } else {
      this.updateFoodItem();
    }
  }

  private updateFoodItem() {
    this.foodService.updateFood(this.food.id, this.food).subscribe(() => {
      // Show success toast
      this.toastService.showSuccess('Food item updated successfully');

      // Navigate to /chef-home and refresh the page
      this.router.navigate(['/chef-home']).then(() => {
        window.location.reload(); // Reload the page to refresh
      });
    }, (error: any) => {
      // Show error toast
      this.toastService.showError('Error updating food item: ' + error.message);
      console.error('Error updating food item:', error);
    });
  }

  deleteFoodItem() {
    if (this.food.id) {
      this.foodService.deleteFood(this.food.id).subscribe(() => {
        // Show success toast and navigate
        this.toastService.showSuccess('Food item deleted successfully');
        
        // Navigate to /chef-home and refresh the page
        this.router.navigate(['/chef-home']).then(() => {
          window.location.reload(); // Reload the page to refresh
        });
      }, (error: any) => {
        // Show error toast
        this.toastService.showError('Error deleting food item: ' + error.message);
        console.error('Error deleting food item:', error);
      });
    } else {
      console.error('Food ID is missing.');
    }
  }
}
