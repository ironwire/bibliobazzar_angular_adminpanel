import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { StoreService } from '../../services/store.service';
import { inject } from '@angular/core';

export interface VerifyResponse {
  status: string;
  url: string;
}

export const sellerResolver: ResolveFn<VerifyResponse> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log(route.queryParamMap.get('code')!);
  return inject(StoreService).storeEmailVerify({
    code: route.queryParamMap.get('code')!,
  });
};
