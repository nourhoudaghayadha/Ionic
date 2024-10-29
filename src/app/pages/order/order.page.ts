import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { OrderMenuPage } from '../popop/order-menu/order-menu.page';
import { RepasService } from '../../service/chef/repas/repas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  repasList: any[] = []; // Array to store meals
  filters: any = {}; // Object to hold filter criteria

  constructor(
    private repasService: RepasService, 
    public popoverController: PopoverController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRepas(); 
  }

  // Method to fetch meals from Firebase based on filters
  getRepas() {
    this.repasService.getRepas(this.filters).subscribe((data) => {
      console.log(data);
      this.repasList = []; // Reset the array before adding elements
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.repasList.push({ id: key, ...data[key] }); // Add ID here
        }
      }
    }, (error) => {
      console.error("Error fetching meals", error);
    });
  }

  // Method to handle filter application
  applyFilters() {
    this.getRepas(); // Re-fetch meals based on the applied filters
  }

  // Method to handle the update of a meal
  updateRepas(repas: any) {
    console.log("Updating meal:", repas);
    this.router.navigate(['/chef-info', { repas: JSON.stringify(repas) }]);
  }

  segmentChange(ev: any) {
    console.log(ev.detail.value);
    this.filters.orderStatus = ev.detail.value; // Update filters based on selected segment
    this.applyFilters(); // Apply filters
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: OrderMenuPage,
      event: ev,
      mode: 'ios',
      translucent: true
    });
    await popover.present();
  }

  deleteRepas(id: string) {
    if (id) {
      console.log('Deleting item with ID:', id);
      this.repasService.deleteRepas(id).subscribe(
        () => {
          this.repasList = this.repasList.filter(repas => repas.id !== id);
          console.log('Meal deleted successfully');
        },
        (error) => {
          console.error('Error deleting meal', error);
        }
      );
    } else {
      console.error('Invalid ID for deletion');
    }
  }
  
  goToAddPage() {
    this.router.navigate(['/chef-info']); // Redirect to meal addition page
  }
}
