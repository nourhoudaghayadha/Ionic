import { Component, OnInit } from '@angular/core';
import { RepasService } from '../../service/chef/repas/repas.service';
import { PopoverController } from '@ionic/angular';
import { OrderMenuPage } from '../popop/order-menu/order-menu.page';

@Component({
  selector: 'app-chefdetails',
  templateUrl: './chefdetails.page.html',
  styleUrls: ['./chefdetails.page.scss'],
})
export class ChefdetailsPage implements OnInit {
  repasList: any[] = []; // Tableau pour stocker les repas

  constructor(
    private repasService: RepasService, 
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.getRepas(); 
  }

  // Méthode pour récupérer les repas depuis Firebase
  getRepas() {
    this.repasService.getRepas().subscribe((data) => {
      console.log(data);
      for(const i in data){
          this.repasList.push(data[i]);     
      }

    }, (error) => {
      console.error("Erreur lors de la récupération des repas", error);
    });
  }

  // Méthode pour gérer la mise à jour d'un repas
  updateRepas(repas: any) {
    console.log("Mise à jour du repas:", repas);
    // Vous pouvez implémenter une logique pour mettre à jour le repas ici,
    // par exemple, ouvrir un popover ou naviguer vers une page de mise à jour.
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

  deleteRepas(){}
}
