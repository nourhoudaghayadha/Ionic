import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChefHomePageRoutingModule } from './chef-home-routing.module';

import { ChefHomePage } from './chef-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChefHomePageRoutingModule
  ],
  declarations: [ChefHomePage]
})
export class ChefHomePageModule {}
