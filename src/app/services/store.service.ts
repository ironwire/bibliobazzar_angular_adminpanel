import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '../common/store';
import { Observable, map } from 'rxjs';
import { SellerResponse } from '../standalone_components/seller-register/seller-reponse.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private baseUrl = 'http://localhost:8080/biblioBazzar/api/stores';

  constructor(private httpClient: HttpClient) {}

  public getStoreList() {
    return this.httpClient
      .get<StoreResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.storeList));
  }

  public registerStore(seller: FormData) {
    return this.httpClient.post<Store>(this.baseUrl + '/register', seller);
  }

  public storeEmailVerify(request): Observable<SellerResponse> {
    const params = request;
    console.log(params);
    return this.httpClient.get<SellerResponse>(this.baseUrl + '/verify', {
      params,
    });
  }

  public isEmailUnique(email: string) {
    console.log(email);
    return this.httpClient.post<boolean>(
      `${this.baseUrl}/checkEmailUniqueness`,
      email
    );
  }
}
interface StoreResponse {
  _embedded: {
    storeList: Store[];
  };
}
