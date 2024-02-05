import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/biblioBazzar/api/categories'

  constructor(private httpClient: HttpClient) { }

  public getCategoryList() {
    return this.httpClient.get<CategoryResponse>(this.baseUrl).pipe(
      map(response => response._embedded.categoryList)
    );
  }

  public addCategory(category: Category) {
    console.log(category);
    return this.httpClient.post<Category>(this.baseUrl, category);
  }

  getAllCategories(request): Observable<any> {
    const params = request;
    return this.httpClient.get(this.baseUrl + "/page", { params });
  }

}

interface CategoryResponse {
  _embedded: {
    categoryList: Category[]
  }
}

