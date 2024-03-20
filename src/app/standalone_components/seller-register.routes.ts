import { Routes } from '@angular/router';
import { SellerRegisterComponent } from './seller-register/seller-register.component';
import { SellerUpdateComponent } from './seller-update/seller-update.component';

export const SELLER_ROUTES: Routes = [
  { path: 'seller_register', component: SellerRegisterComponent },
  { path: 'seller_update', component: SellerUpdateComponent },
];
