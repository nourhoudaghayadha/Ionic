import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/service/food.service';
import { AuthService } from 'src/app/service/auth.service'; // Import AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage {
  constructor(
    private foodService: FoodService,
    private toastController: ToastController,
    private router: Router,
    private authService: AuthService // Add AuthService to the constructor
  ) {}

  food: Food = {
    id: '',
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    chefId: '',
    category: '',
    dietaryTags: [],
  };
  
  selectedImage: File | null = null;
  categories = ['Italian', 'Vegan', 'Mexican', 'Asian', 'Dessert', 'BBQ'];
  dietaryTags = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'];



  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => (this.food.imageUrl = e.target.result);
      reader.readAsDataURL(file);
    }
  }

  formatPrice(event: any) {
    let input = event.target.value;

    // Remove any non-digit characters except for the decimal point
    input = input.replace(/[^0-9.]/g, '');

    // Ensure there is only one decimal point
    const parts = input.split('.');
    if (parts.length > 2) {
      input = parts[0] + '.' + parts.slice(1).join('');
    }

    // Limit to two decimal places
    if (parts[1] && parts[1].length > 2) {
      input = parts[0] + '.' + parts[1].slice(0, 2);
    }

    // Remove leading zeros if the input is not just '0'
    if (input.startsWith('0') && input.length > 1) {
      input = input.replace(/^0+/, ''); // Remove leading zeros
    }

    // Set the formatted value back to the input
    event.target.value = input;

    // Update model value
    this.food.price = parseFloat(input) || 0; // If input is empty or invalid, set to 0
  }

  // Function to handle form submission
  async onSubmit(form: NgForm) {
    if (form.valid && this.selectedImage) {
      try {
        // Get the chef's ID from the authService
        this.authService.getCurrentUserId().subscribe(async (chefId) => {
          if (chefId) {
            this.food.chefId = chefId; // Set the chefId in the food object
            
            // Upload image and get the URL
            const imageUrl = await this.foodService.uploadImage(this.selectedImage as File).toPromise();
            if (imageUrl) {
              this.food.imageUrl = imageUrl; // Set the image URL
            } else {
              console.error('Image upload failed, no URL returned');
              await this.presentToast('Failed to upload image.');
              return;
            }

            // Call the service to save the food item
            this.foodService.addFood(this.food).subscribe(
              async () => {
                await this.presentToast('Food item added successfully!');
                form.reset();
                this.selectedImage = null; // Clear the selected image
                this.router.navigate(['/chef-home']); // Redirect to chef home page
              },
              async (error) => {
                console.error('Error adding food item:', error);
                await this.presentToast('Failed to add food item.');
              }
            );
          } else {
            await this.presentToast('Error: No chef is currently logged in.');
            return;
          }
        });
      } catch (error) {
        console.error('Error retrieving chef ID or adding food item:', error);
        await this.presentToast('Error adding food item.');
      }
    } else {
      console.log('Form is invalid or no image selected');
    }
  }

  // Function to display a toast message
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
