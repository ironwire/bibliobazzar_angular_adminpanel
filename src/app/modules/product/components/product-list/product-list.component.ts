import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Book } from '../../../../common/book';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { ShowBookImagesDialogComponent } from '../show-book-images-dialog/show-book-images-dialog.component';
import { ImageProcessingServiceService } from '../../services/image-processing-service.service';
import { BookImage } from '../../../../common/book-image';
import { FileHandle } from '../../../../common/file-handle.model';
import { Slide } from '../../../../common/slide.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  constructor(
    private bookService: BookService,
    public imagesDialog: MatDialog,
    private bookImageProcessService: ImageProcessingServiceService,
    private router: Router
  ) {}
  totalElements: number = 0;
  filterValue: string = '';
  bookImages: any[] = [];
  imageHandles: FileHandle[] = [];

  slides: Slide[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'Book ID',
    'Book Name',
    '作者',
    'Publisher',
    'Images',
    'Publication Date',
    'price',
    'Binding Type',
    'Book Condition',
    'Action',
  ];

  books: Book[] = [];
  dataSource: any;

  ngOnInit(): void {
    this.getAllBooksByParams({ page: '0', size: '5' });
  }

  private getAllBooksByParams(request) {
    this.bookService.getAllBooksByParams(request).subscribe({
      next: (data) => {
        console.log(data['_embedded'].bookList);
        this.totalElements = data['page'].totalElements;
        this.dataSource = new MatTableDataSource(data['_embedded'].bookList);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadCategoryPage())).subscribe();
  }

  loadCategoryPage() {
    if (this.filterValue === '')
      this.getAllBooksByParams({
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize,
      });
    else
      this.getAllBooksByParams({
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize,
        keyword: this.filterValue,
      });
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    this.getAllBooksByParams({
      page: '0',
      size: '5',
      keyword: this.filterValue,
    });
  }

  private getBookImagesByBookId(bookId: number) {
    this.bookService.getBookImageByBookId(bookId).subscribe({
      next: (data) => {
        this.imageHandles = this.bookImageProcessService.createBookImages(data);
        for (let handle of this.imageHandles) {
          console.log(handle);
          let slide = {
            url: handle.url,
            title: handle.file.name,
            description: 'book picture',
          };
          this.slides.push(slide);
        }

        console.log(this.slides);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  showImages(book: Book) {
    this.slides = [];
    this.getBookImagesByBookId(book.id);
    console.log(this.slides);
    this.imagesDialog.open(ShowBookImagesDialogComponent, {
      data: {
        slides: this.slides,
      },
      height: '800px',
      width: '700px',
    });
  }

  editBookDetails(bookId: number) {
    console.log(bookId);
    this.router.navigate(['/book/addNewBook', { id: bookId }]);
  }
}
