import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-seller-header',
  standalone: true,
  imports: [MatToolbarModule, CommonModule, RouterModule],
  templateUrl: './seller-header.component.html',
  styleUrl: './seller-header.component.css',
})
export class SellerHeaderComponent {
  public navbarfixed: boolean = false;

  constructor(private userAuthService: UserAuthService) {}

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 100) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }

  isLoggedIn() {
    console.log(this.userAuthService.isLoggedIn());
    return this.userAuthService.isLoggedIn();
  }
}
