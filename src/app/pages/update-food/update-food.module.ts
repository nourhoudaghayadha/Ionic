import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateFoodPageRoutingModule } from './update-food-routing.module';

import { UpdateFoodPage } from './update-food.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateFoodPageRoutingModule
  ],
  declarations: [UpdateFoodPage]
})
export class UpdateFoodPageModule {}
