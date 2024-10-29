// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Import the AuthGuard

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./pages/order/order.module').then(m => m.OrderPageModule),
    canActivate: [AuthGuard] // Protect with AuthGuard
  },
  {
    path: 'pop/order',
    loadChildren: () => import('./pages/popop/order/order.module').then(m => m.OrderPageModule),
    canActivate: [AuthGuard] // Protect with AuthGuard
  },
  {
    path: 'order-menu',
    loadChildren: () => import('./pages/popop/order-menu/order-menu.module').then(m => m.OrderMenuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentPageModule),
    canActivate: [AuthGuard]
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
    loadChildren: () => import('./pages/chefdetails/chefdetails.module').then(m => m.ChefdetailsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'chef-info',
    loadChildren: () => import('./pages/chef-info/chef-info.module').then(m => m.ChefInfoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'first-page',
    loadChildren: () => import('./pages/first-page/first-page.module').then(m => m.FirstPagePageModule)
  },
  {
    path: 'add-food',
    loadChildren: () => import('./pages/add-food/food.module').then(m => m.FoodPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user-home',
    loadChildren: () => import('./pages/user-home/user-home.module').then(m => m.UserHomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'update-food/:id',
    loadChildren: () => import('./pages/update-food/update-food.module').then(m => m.UpdateFoodPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'chef-home',
    loadChildren: () => import('./pages/chef-home/chef-home.module').then(m => m.ChefHomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**', // Fallback route for unknown paths
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'commande',
    loadChildren: () => import('./pages/commande/commande.module').then( m => m.CommandePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
