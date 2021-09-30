import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './admin/login/login-page.component';
import { ProductsPageComponent } from './admin/products-page/products-page.component';
import { PurchasesPageComponent } from './admin/purchases-page/purchases-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'cart', component: CartPageComponent},
  {path: 'admin/produtos', component: ProductsPageComponent},
  {path: 'admin/compras', component: PurchasesPageComponent},
  {path: 'admin/login', component: LoginPageComponent},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
