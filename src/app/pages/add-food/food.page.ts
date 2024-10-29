import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/service/food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage {
  
  food: Food = {
  id: '', // Populate if editing
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  chefId: '', // Provide the chefId from authentication context or similar
  category: '',
  dietaryTags: [],
  rating: 0,
};

selectedImage: File | null = null;

constructor(private foodService: FoodService, private toastController: ToastController) {}

onFileSelected(event: any) {
  this.selectedImage = event.target.files[0];
}

async onSubmit(form: NgForm) {
  if (form.valid && this.selectedImage) {
    // Logic to upload image and get the URL
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
  } else {
    console.log('Form is invalid or no image selected');
  }
}

async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    position: 'top',
  });
  toast.present();
}
}