import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateFoodPage } from './update-food.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateFoodPageRoutingModule {}
