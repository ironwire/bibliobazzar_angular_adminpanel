import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seller-header',
  standalone: true,
  imports: [MatToolbarModule, CommonModule, RouterModule],
  templateUrl: './seller-header.component.html',
  styleUrl: './seller-header.component.css',
})
export class SellerHeaderComponent {
  public navbarfixed: boolean = false;

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 100) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }
}
