import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../service/food.service';
import { Food } from '../../models/food.model';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.page.html',
  styleUrls: ['./commande.page.scss'],
})
export class CommandePage implements OnInit {
  repasList: Food[] = []; // Initialise le tableau de repas
  selectedRepas!: Food; // Pour stocker le repas sélectionné

  constructor(private foodService: FoodService) { // Injection de FoodService
    // Note : Pas besoin d'initialiser un repas ici, cela sera géré via getOrders()
  }

  ngOnInit() {
    this.getOrders();
  }

  // Récupérer la liste des commandes
  getOrders() {
    this.foodService.getFood().subscribe(
      (data: Food[]) => {
        this.repasList = data; // Assurez-vous que 'data' a le format attendu
      },
      (error) => {
        console.error("Erreur lors de la récupération des commandes", error);
      }
    );
  }

  // Supprimer une commande
  deleteRepas(repasId: string) {
    this.foodService.deleteFood(repasId).subscribe(
      () => {
        this.repasList = this.repasList.filter((repas) => repas.id !== repasId);
      },
      (error) => {
        console.error("Erreur lors de la suppression du repas", error);
      }
    );
  }

  // Navigation vers la liste des aliments
  goToFoodList() {
    // Implémentez la logique pour naviguer vers la page de la liste des aliments
    console.log("Naviguer vers la liste des aliments"); // Remplacez ceci par la logique de navigation réelle
  }

  // Mettre à jour une commande
  updateRepas(repas: Food) {
    // Implémentez la logique pour mettre à jour le repas
    console.log("Mise à jour du repas:", repas);
  }
}
