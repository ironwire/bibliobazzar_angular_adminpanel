import { Routes } from '@angular/router';
import { SellerRegisterComponent } from './seller-register/seller-register.component';
import { SellerUpdateComponent } from './seller-update/seller-update.component';
import { SellerVerifyComponent } from './seller-verify/seller-verify.component';
import { sellerResolver } from './seller-verify/seller-verify.resolver';

export const SELLER_ROUTES: Routes = [
  { path: 'seller_register', component: SellerRegisterComponent },
  { path: 'seller_update', component: SellerUpdateComponent },
  {
    path: 'verify',
    component: SellerVerifyComponent,
    //resolve: { response: sellerResolver },
  },
];
