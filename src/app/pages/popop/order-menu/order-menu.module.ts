import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderMenuPageRoutingModule } from './order-menu-routing.module';

import { OrderMenuPage } from './order-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderMenuPageRoutingModule
  ],
  declarations: [OrderMenuPage]
})
export class OrderMenuPageModule {}
