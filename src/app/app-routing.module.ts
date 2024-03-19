import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './pages/book/book.component';
import { BookCategoryComponent } from './pages/book-category/book-category.component';
import { BookSellersComponent } from './pages/book-sellers/book-sellers.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { BookOrdersComponent } from './pages/book-orders/book-orders.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './_auth/auth.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'book',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'book',
    loadChildren: () =>
      import('./modules/product/product.module').then((c) => c.ProductModule),
    canActivate: [authGuard],
    data: { roles: ['BookAdmin', 'Admin'] },
  },
  {
    path: 'bookSellers',
    component: BookSellersComponent,
  },
  {
    path: 'customers',
    component: CustomersComponent,
  },
  {
    path: 'bookOrders',
    component: BookOrdersComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard],
    data: { roles: ['User'] },
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./modules/category/category.module').then(
        (c) => c.CategoryModule
      ),
    canActivate: [authGuard],
    data: { roles: ['CateAdmin'] },
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
