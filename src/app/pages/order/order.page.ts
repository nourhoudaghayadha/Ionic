import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { OrderMenuPage } from '../popop/order-menu/order-menu.page';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  orders = [
    {
      date: "30 DEC 1993",
      order: [
        {
          id: "03",
          image: "003.jpeg",
          title: "bacon wrapper",
          amount: "23.09",
          transId: "23452324",
          time: "10 min",
          status: "CONFIRM"
        },
        {
          id: "03",
          image: "003.jpeg",
          title: "bacon wrapper",
          amount: "23.09",
          transId: "23452324",
          time: "10 min",
          status: "CONFIRM"
        }
      ]
    },
    {
      date: "30 DEC 1993",
      order: [
        {
          id: "03",
          image: "003.jpeg",
          title: "bacon wrapper",
          amount: "23.09",
          transId: "23452324",
          time: "10 min",
          status: "CONFIRM"
        },
        {
          id: "03",
          image: "003.jpeg",
          title: "bacon wrapper",
          amount: "23.09",
          transId: "23452324",
          time: "10 min",
          status: "CONFIRM"
        }
      ]
    }
  ];

  constructor(public popverController:PopoverController) {}

  ngOnInit() {}

  segmentChange(ev: any) {
    console.log(ev.detail.value);
  }

  async presentPopover(ev: any){
    const popover = await this.popverController.create({
      component: OrderMenuPage,
      event: ev,
      mode:'ios',
      translucent:true
    });
    await popover.present();
  }
}
