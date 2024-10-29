import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/service/food.service';
import { AuthService } from 'src/app/service/auth.service'; // Import AuthService

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage {
  
  food: Food = {
    id: '', 
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    chefId: '', // This will be set based on the current chef's ID
    category: '',
    dietaryTags: [],
    rating: 0,
  };

  selectedImage: File | null = null;

  constructor(
    private foodService: FoodService,
    private toastController: ToastController,
    private authService: AuthService // Inject AuthService
  ) {}

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  // Function to handle form submission
  async onSubmit(form: NgForm) {
    if (form.valid && this.selectedImage) {
      try {
        // Get the chef's ID from the authService
        this.authService.getCurrentUserId().subscribe(async (chefId) => {
          if (chefId) {
            this.food.chefId = chefId; // Set the chefId in the food object
          } else {
            await this.presentToast('Error: No chef is currently logged in.');
            return;
          }

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
            },
            async (error) => {
              console.error('Error adding food item:', error);
              await this.presentToast('Failed to add food item.');
            }
          );
        });

        // Upload image and get the URL
        const imageUrl = await this.foodService.uploadImage(this.selectedImage).toPromise();
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
          },
          async (error) => {
            console.error('Error adding food item:', error);
            await this.presentToast('Failed to add food item.');
          }
        );
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
