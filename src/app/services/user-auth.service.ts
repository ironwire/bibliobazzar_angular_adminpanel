import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles'));
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken');
  }

  public isTokenExpired() {
    const expiry = JSON.parse(atob(this.getToken().split('.')[1])).exp;
    return expiry * 1000 > Date.now();
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    // console.log(this.getRoles(), this.getToken());
    // console.log(this.getRoles() && this.getToken());
    return this.getRoles() && this.getToken(); // && !this.isTokenExpired();
  }

  public isAdminRole() {
    return this.getRoles().find((x) => JSON.stringify(x).includes('Admin'));
  }

  public isSellerRole() {
    return this.getRoles().find((x) => JSON.stringify(x).includes('Seller'));
  }
}
