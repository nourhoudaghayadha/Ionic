import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChefdetailsPage } from './chefdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ChefdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChefdetailsPageRoutingModule {}
