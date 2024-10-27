import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-order-menu',
  templateUrl: './order-menu.page.html',
  styleUrls: ['./order-menu.page.scss'],
})
export class OrderMenuPage implements OnInit {

  constructor(public popverController:PopoverController) { }

  ngOnInit() {
  }

  close(){
    this.popverController.dismiss();
  }
}
