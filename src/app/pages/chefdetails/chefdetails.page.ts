import { Component, OnInit } from '@angular/core';
import { RepasService } from '../../service/chef/repas/repas.service'; 
import { MealService } from '../../service/meal/meal.service';


@Component({
  selector: 'app-chefdetails',
  templateUrl: './chefdetails.page.html',
  styleUrls: ['./chefdetails.page.scss'],
})
export class ChefdetailsPage implements OnInit {

  chef: any; // Objet pour stocker les données du chef
  orders: any[] = []; // Liste des repas

  

  
constructor(
    private RepasService: RepasService,
    private mealService: MealService // Injectez le service des repas
  ) {}

  ngOnInit() {
    this.getChefInfo(); // Récupérer les informations du chef
    this.getMeals(); // Récupérer les repas
  }

  // Méthode pour récupérer les informations du chef
  getChefInfo() {
   /* const chefId = ''; // Remplacez par l'ID du chef connecté
    
    
this.chefService.getChefById(chefId).subscribe((data) => {
      
   
this.chef = data;
    });*/
  }

  // Méthode pour récupérer les repas depuis Firestore
  
  
getMeals() {
    /*this.mealService.getAllMeals().subscribe((data) => {
      
    
this.orders = data;
    });
  }

  
    });*/

  

    }
presentPopover(event: Event) {
    // Logique pour le popover
  }
}