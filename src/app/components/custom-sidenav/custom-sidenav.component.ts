import { Component, Input, computed, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};

@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css',
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'category',
      label: 'Book Category',
      route: 'category',
    },
    {
      icon: 'book',
      label: 'Book',
      route: 'book',
    },
    {
      icon: 'seller',
      label: 'Book Sellers',
      route: 'bookSellers',
    },
    {
      icon: 'account_circle',
      label: 'Customers',
      route: 'customers',
    },
    {
      icon: 'dashboard',
      label: 'Book Orders',
      route: 'bookOrders',
    },
    {
      icon: 'group',
      label: 'Users',
      route: 'users',
    },
    // {
    //   icon: 'login',
    //   label: 'Login',
    //   route: 'login',
    // },
  ]);

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));
}
