import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '../common/store';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseUrl = 'http://localhost:8080/biblioBazzar/api/stores'

  constructor(private httpClient: HttpClient) { }

  public getStoreList() {
    return this.httpClient.get<StoreResponse>(this.baseUrl).pipe(
      map(response => response._embedded.storeList)
    );
  }


}
interface StoreResponse {
  _embedded: {
    storeList: Store[]
  }
}

