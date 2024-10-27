import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChefdetailsPageRoutingModule } from './chefdetails-routing.module';

import { ChefdetailsPage } from './chefdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChefdetailsPageRoutingModule
  ],
  declarations: [ChefdetailsPage]
})
export class ChefdetailsPageModule {}
