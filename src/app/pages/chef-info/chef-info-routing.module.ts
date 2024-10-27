import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChefInfoPage } from './chef-info.page';

const routes: Routes = [
  {
    path: '',
    component: ChefInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChefInfoPageRoutingModule {}
