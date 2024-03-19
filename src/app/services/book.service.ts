import { Injectable } from '@angular/core';
import { Book } from '../common/book';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BookImage } from '../common/book-image';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:8080/biblioBazzar/api/books';

  constructor(private httpClient: HttpClient) {}

  public saveBook(book: Book) {
    //console.log(book);
    return this.httpClient.post<Book>(this.baseUrl, book);
  }

  public addBook(book: FormData) {
    //console.log(book);
    return this.httpClient.post<Book>(this.baseUrl, book);
  }

  public getBookImageByBookId(bookId: number) {
    let fetchUrl = this.baseUrl + '/' + bookId + '/images';
    return this.httpClient.get<BookImage[]>(fetchUrl);
  }

  public getBookList() {
    return this.httpClient
      .get<BookResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.bookList));
  }

  getAllBooksByParams(request): Observable<any> {
    const params = request;
    return this.httpClient.get(this.baseUrl + '/page', { params });
  }

  public getBookDetailsById(bookId) {
    // return this.httpClient.get<Book>(this.baseUrl + '/' + bookId);
    return this.httpClient.get<Book>(`${this.baseUrl}/${bookId}`);
  }
}
interface BookResponse {
  _embedded: {
    bookList: Book[];
  };
}
