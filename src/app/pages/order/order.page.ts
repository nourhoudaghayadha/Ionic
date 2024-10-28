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
  repasList: any[] = []; // Tableau pour stocker les repas

  constructor(
    private repasService: RepasService, 
    public popoverController: PopoverController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRepas(); 
  }

  // Méthode pour récupérer les repas depuis Firebase
  getRepas() {
    this.repasService.getRepas().subscribe((data) => {
      console.log(data);
      this.repasList = []; // Réinitialisez le tableau avant d'ajouter des éléments
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.repasList.push({ id: key, ...data[key] }); // Ajoutez l'ID ici
        }
      }
    }, (error) => {
      console.error("Erreur lors de la récupération des repas", error);
    });
  }
  

  // Méthode pour gérer la mise à jour d'un repas
// Exemple de popover pour éditer un repas
updateRepas(repas: any) {
  console.log("Mise à jour du repas:", repas);
  // Ouvrez un popover ou naviguez vers une page d'édition
  this.router.navigate(['/chef-info', { repas: JSON.stringify(repas) }]);
}


  segmentChange(ev: any) {
    console.log(ev.detail.value);
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
      console.log('Suppression de l\'élément avec ID:', id);
      this.repasService.deleteRepas(id).subscribe(
        () => {
          this.repasList = this.repasList.filter(repas => repas.id !== id);
          console.log('Repas supprimé avec succès');
        },
        (error) => {
          console.error('Erreur lors de la suppression du repas', error);
        }
      );
    } else {
      console.error('ID invalide pour la suppression');
    }
  }
  
  
  goToAddPage() {
    
    
    this.router.navigate(['/chef-info']); // Redirige vers la page d'ajout de repas
      }
  


}