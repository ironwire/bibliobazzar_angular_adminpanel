import { Component, OnInit } from '@angular/core';
import {
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormGroup,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { Category } from '../../../../common/category';
import { CategoryService } from '../../../../services/category.service';
import { Book } from '../../../../common/book';
import { Store } from '../../../../common/store';
import { StoreService } from '../../../../services/store.service';
import { BookService } from '../../../../services/book.service';
import { DateTransformServiceService } from '../../../../services/date-transform-service.service';
import { publishFacade } from '@angular/compiler';
import { FileHandle } from '../../../../common/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { stringify, toJSON } from 'flatted';
import { ImageProcessingServiceService } from '../../services/image-processing-service.service';

interface BindingType {
  value: number;
  viewValue: string;
}

interface BookCondition {
  value: number;
  viewValue: string;
}

interface GoodReadsRating {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-product-add-new',
  templateUrl: './product-add-new.component.html',
  styleUrl: './product-add-new.component.css',
})
export class ProductAddNewComponent implements OnInit {
  isNewBook = true;
  private categories: Category[] = [];
  public clistForNewBook: Category[] = [];
  public storeListForNewBook: Store[] = [];

  public tempImages: FileHandle[] = [];

  book: Book = {
    id: 0,
    title: '',
    author: '',
    publisher: '',
    publicationDate: '',

    isbn10: '',
    isbn13: '',
    price: 0,
    bindingType: '',
    bookCondition: '',
    goodReadsRating: 0,
    quantity: 1,
    signed: '',
    images: [],
    edition: 1,
    enabled: true,
    aboutThisItem: '',
    categoryId: '',
    storeId: '',

    // createdTime: '',
    // updatedTime: '',
  };

  private category: Category = {
    id: 0,
    name: '',
    allParentIDs: '',
    enabled: true,
    parent: null,
    children: null,
  };

  private store: Store = {
    id: 0,
    name: '',
    description: '',
    shipingTerm: '',
    termOfSale: '',
    email: '',
    contactPerson: '',
    createdTime: '',
    updatedTime: '',
  };

  bookForm = this.fb.group({
    id: [0],
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    author: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    publisher: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    publicationDate: ['', [Validators.required]],
    isbn10: ['', [Validators.minLength(10), Validators.maxLength(10)]],
    isbn13: ['', [Validators.minLength(13), Validators.maxLength(13)]],
    price: [0, [Validators.required]],
    bindingType: ['', [Validators.required]],
    bookCondition: ['', [Validators.required]],
    goodReadsRating: [1],
    quantity: [1, [Validators.required]],
    signed: [''],
    edition: [1, [Validators.min(1)]],
    aboutThisItem: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(1024),
      ],
    ],

    enabled: [true, Validators.requiredTrue],

    categoryId: ['', Validators.required],
    storeId: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private storeService: StoreService,
    private bookService: BookService,
    private dateService: DateTransformServiceService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private bookImageService: ImageProcessingServiceService
  ) {}

  ngOnInit(): void {
    this.listCategories();
    this.listStores();
    this.book = this.activatedRoute.snapshot.data['book'];

    //console.log(this.book);
    //this.bookForm = this.parseData(this.book, this.bookForm) as FormGroup;
    this.bookForm = this.createBookFormGroup(this.book);
    this.getBookImagesByBookId(this.book.id);
    //如果book.id不为空，说明是一个更新操作而不是新建操作
    if (this.book && this.book.id) {
      this.isNewBook = false;
    }
  }

  saveBook() {
    this.bookForm.patchValue({
      publicationDate: this.dateService.transformDate(
        this.bookForm.get('publicationDate').value
      ),
    });
    this.book = new Book(this.bookForm); //this.bookForm.value
    this.book.images = this.tempImages;
    console.log(this.book['value']);
    //alert("BookForm data are: " + this.dateService.transformDate(this.bookForm.get('publicationDate').value));

    /* 暂时注释一下
    const bookFormData = this.prepareFormData(this.book);
    //this.bookForm['publicationDate']. = this.dateService.transformDate(this.bookForm.get('publicationDate').value);
    //alert("BookForm data are: " + JSON.stringify(model));

    this.bookService.addBook(bookFormData).subscribe({
      next: (data: Book) => {
        console.log(data);
        this.bookForm.reset();
        this.tempImages = [];
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    }); */
    //console.log(this.book);
    //const bookFormData = this.prepareBookData(this.book);

    const bookFormData = this.prepareFormData(this.book);
    console.log(bookFormData);
    this.bookService.addBook(bookFormData).subscribe({
      next: (data: Book) => {
        console.log(data);
        this.bookForm.reset();
        this.tempImages = [];
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  prepareBookData(book: Book): FormData {
    const formData = new FormData();

    formData.append(
      'book',
      new Blob([stringify(book)], {
        type: 'application/json',
      })
    );

    for (var i = 0; i < book.images.length; i++) {
      formData.append(
        'imageFiles',
        book.images[i].file,
        book.images[i].file.name
      );
    }

    return formData;
  }

  prepareFormData(book: Book): FormData {
    const formData = new FormData();

    formData.append(
      'book',
      new Blob([JSON.stringify(book['value'])], {
        //JSON.stringify(this.bookForm.value)
        type: 'application/json',
      })
    );

    for (var i = 0; i < book.images.length; i++) {
      formData.append(
        'imageFiles',
        book.images[i].file,
        book.images[i].file.name
      );
    }
    return formData;
  }

  onFileSelected(event) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };

      this.tempImages.push(fileHandle);
      console.log(this.tempImages);
    }
  }

  removeImages(i: number) {
    this.tempImages.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.tempImages.push(fileHandle);
  }

  listStores() {
    this.storeService.getStoreList().subscribe({
      next: (data: Store[]) => {
        console.log(data);
        this.storeListForNewBook = data;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  listCategories() {
    this.categoryService.getCategoryList().subscribe({
      next: (data: Category[]) => {
        console.log(data);
        this.categories = data;
        this.getHierarchicalCategories();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  getHierarchicalCategories() {
    this.categories.forEach((category) => {
      console.log(this.categories);
      if (category.allParentIDs === '') {
        this.clistForNewBook.push(category);
        let children: Category[] = category.children;
        if (children.length > 0) {
          children.forEach((child) => {
            child.parent = category;
            child.name = '--' + child.name;
            this.clistForNewBook.push(child);
            this.listChildren(child, 1);
          });
        }
      }
      console.log(this.clistForNewBook);
    });
    this.clistForNewBook.forEach((element) => {
      element.children = null;
    });
  }

  listChildren(parent: Category, sublevel: number): void {
    let newSublevel: number = sublevel + 1;
    let childs: Category[] = parent.children;
    childs.forEach((child) => {
      let tempString = '';
      for (let i = 0; i < newSublevel; i++) {
        tempString = tempString + '--';
      }
      child.parent = parent;
      child.name = tempString + child.name;
      this.clistForNewBook.push(child);
      this.listChildren(child, newSublevel);
    });
  }

  bindingTypes: BindingType[] = [
    { value: 0, viewValue: 'Soft Cover' },
    { value: 1, viewValue: 'Hard Cover' },
    { value: 2, viewValue: 'Stapled' },
    { value: 3, viewValue: 'Spiral' },
  ];

  bookConditions: BookCondition[] = [
    { value: 0, viewValue: 'As New' },
    { value: 1, viewValue: 'Fine' },
    { value: 2, viewValue: 'Very Good' },
    { value: 3, viewValue: 'Fair' },
    { value: 4, viewValue: 'Poor' },
  ];

  goodRatings: GoodReadsRating[] = [
    { value: 0, viewValue: 'No Rating' },
    { value: 1, viewValue: '1 Star' },
    { value: 2, viewValue: '2 Stars' },
    { value: 3, viewValue: '3 Stars' },
    { value: 4, viewValue: '4 Stars' },
    { value: 5, viewValue: '5 Stars' },
  ];

  parseData(data: any, validators?: any): FormGroup {
    //if (typeof data === 'object' && data !== null) {
    console.log(data);
    const formGroupContent = {};
    for (const [key, value] of Object.entries(data)) {
      console.log(key, value);
      if (key === 'category') {
        formGroupContent['categoryId'] = data['category'].id;
      } else if (key === 'store') {
        formGroupContent['storeId'] = data['store'].id;
      } else {
        console.log(key, value);
        formGroupContent[key] = data[key]; //this.parseData(value, validators[key]);
      }
    }
    return this.fb.group(formGroupContent);
    //}
  }

  createBookFormGroup(book: any): FormGroup {
    return this.fb.group({
      id: [{ value: book.id, disabled: true }],
      title: [
        book.title,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      author: [
        book.author,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      publisher: [
        book.publisher,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      publicationDate: [book.publicationDate, [Validators.required]],
      isbn10: [
        book.isbn10,
        [Validators.minLength(10), Validators.maxLength(10)],
      ],
      isbn13: [
        book.isbn13,
        [Validators.minLength(13), Validators.maxLength(13)],
      ],
      price: [book.price, [Validators.required]],
      bindingType: [book.bindingType, [Validators.required]],
      bookCondition: [book.bookCondition, [Validators.required]],
      goodReadsRating: [book.goodReadsRating],
      quantity: [book.quantity, [Validators.required]],
      signed: [book.signed],
      edition: [book.edition, [Validators.min(1)]],
      aboutThisItem: [
        book.aboutThisItem,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(1024),
        ],
      ],

      enabled: [book.enabled, Validators.requiredTrue],

      categoryId: [book['category'].id, Validators.required],
      storeId: [book['store'].id, Validators.required],
    });
  }

  private getBookImagesByBookId(bookId: number) {
    this.bookService.getBookImageByBookId(bookId).subscribe({
      next: (data) => {
        this.tempImages = this.bookImageService.createBookImages(data);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
}
