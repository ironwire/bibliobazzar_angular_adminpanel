import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { BookService } from '../../services/book.service';

export const bookResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<any> => {
  const bookId = route.paramMap.get('id');
  const bookService = inject(BookService);
  if (!bookId) {
    return of(undefined);
  }
  return bookService.getBookDetailsById(+bookId);
};
