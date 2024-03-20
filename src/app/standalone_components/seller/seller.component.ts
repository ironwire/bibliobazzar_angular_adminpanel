import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SellerHeaderComponent } from '../seller-header/seller-header.component';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [RouterOutlet, SellerHeaderComponent],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css',
})
export class SellerComponent {}
