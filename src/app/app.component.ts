import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthService } from './services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService
  ) {}
  title = 'angular-adminpanel';

  collapsed = signal(false);

  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));

  public logout() {
    alert('hi');
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }
}
