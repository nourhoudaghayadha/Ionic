import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChefInfoPageRoutingModule } from './chef-info-routing.module';

import { ChefInfoPage } from './chef-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChefInfoPageRoutingModule
  ],
  declarations: [ChefInfoPage]
})
export class ChefInfoPageModule {}
