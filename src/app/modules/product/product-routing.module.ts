import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddNewComponent } from './components/product-add-new/product-add-new.component';
import { bookResolver } from './book.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      { path: 'listBook', component: ProductListComponent },
      {
        path: 'addNewBook',
        component: ProductAddNewComponent,
        resolve: { book: bookResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
