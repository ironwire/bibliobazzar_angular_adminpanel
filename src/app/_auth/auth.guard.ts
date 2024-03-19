import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userAuthService: UserAuthService = inject(UserAuthService);
  const router: Router = inject(Router);
  const userService: UserService = inject(UserService);

  const role = route.data['roles'] as Array<string>;
  console.log(role);
  if (userAuthService.getToken() !== null) {
    if (role) {
      const match = userService.isRoleMatch(role);
      if (match) {
        return true;
      } else {
        router.navigate(['/forbidden']);
        return false;
      }
    }
    router.navigate(['/login']);
    return false;
  }
  return false;
};
