import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { MatListModule } from '@angular/material/list';
import { BookCategoryComponent } from './pages/book-category/book-category.component';
import { BookComponent } from './pages/book/book.component';
import { BookSellersComponent } from './pages/book-sellers/book-sellers.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { BookOrdersComponent } from './pages/book-orders/book-orders.component';
import { UsersComponent } from './pages/users/users.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/category.service';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './common/components/confirm-dialog/confirm-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    CustomSidenavComponent,
    BookCategoryComponent,
    BookComponent,
    BookSellersComponent,
    CustomersComponent,
    BookOrdersComponent,
    UsersComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbar,
    MatButton,
    MatIcon,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent],

})
export class AppModule { }
