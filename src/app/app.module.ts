import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { MatListModule } from '@angular/material/list';
import { BookCategoryComponent } from './pages/book-category/book-category.component';
import { BookComponent } from './pages/book/book.component';
import { BookSellersComponent } from './pages/book-sellers/book-sellers.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { BookOrdersComponent } from './pages/book-orders/book-orders.component';
import { UsersComponent } from './pages/users/users.component';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/category.service';

import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './common/components/confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';
import { ImagesliderComponent } from './common/components/imageslider/imageslider.component';
import { LoginComponent } from './components/login/login.component';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import {
  RouterModule,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { authGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { SellerVerifyComponent } from './standalone_components/seller-verify/seller-verify.component';

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
    ImagesliderComponent,
    LoginComponent,
    ForbiddenComponent,
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
    MatDialogModule,
    FormsModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
  ],

  providers: [
    CategoryService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideRouter(
      [
        {
          path: 'seller',
          loadComponent: () =>
            import('./standalone_components/seller/seller.component').then(
              (m) => m.SellerComponent
            ),
          loadChildren: () =>
            import('./standalone_components/seller-register.routes').then(
              (r) => r.SELLER_ROUTES
            ),
        },
      ],
      withComponentInputBinding()
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
