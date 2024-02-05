import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './pages/book/book.component';
import { BookCategoryComponent } from './pages/book-category/book-category.component';
import { BookSellersComponent } from './pages/book-sellers/book-sellers.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { BookOrdersComponent } from './pages/book-orders/book-orders.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'book'
  },
  {
    path: 'book',
    component: BookComponent,
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
    component: UsersComponent
  },
  { path: 'category', loadChildren: () => import('./modules/category/category.module').then((c) => c.CategoryModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
