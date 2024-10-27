import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderMenuPage } from './order-menu.page';

const routes: Routes = [
  {
    path: '',
    component: OrderMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderMenuPageRoutingModule {}
