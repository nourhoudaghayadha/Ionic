import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./pages/order/order.module').then(m => m.OrderPageModule)
  },
  {
    path: 'pop/order',
    loadChildren: () => import('./pages/popop/order/order.module').then(m => m.OrderPageModule)
  },
  {
    path: 'order-menu',
    loadChildren: () => import('./pages/popop/order-menu/order-menu.module').then(m => m.OrderMenuPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'chefdetails',
    loadChildren: () => import('./pages/chefdetails/chefdetails.module').then( m => m.ChefdetailsPageModule)
  },
  {
    path: 'chef-info',
    loadChildren: () => import('./pages/chef-info/chef-info.module').then( m => m.ChefInfoPageModule)
  },

  {
    path: 'first-page',
    loadChildren: () => import('./pages/first-page/first-page.module').then( m => m.FirstPagePageModule)
  },
  {
    path: 'add-food',
    loadChildren: () => import('./pages/add-food/food.module').then( m => m.FoodPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
