import { BookDetails } from './book-details';
import { Category } from './category';
import { FileHandle } from './file-handle.model';
import { Store } from './store';

export class Book {
  public constructor(init?: Partial<Book>) {
    Object.assign(this, init);
  }

  public id: number;
  public title: string;
  public author: string;
  public publisher: string;
  public publicationDate: string;

  public isbn10: string;
  public isbn13: string;
  public price: number;
  public bindingType: string;
  public bookCondition: string;
  public goodReadsRating: number;
  public quantity: number;
  public signed: string;
  // public mainImage: string;
  public images: FileHandle[];
  public edition: number;
  public enabled: boolean;
  public aboutThisItem: string;

  // public createdTime: string;
  // public updatedTime: string;
  public categoryId: string;
  public storeId: string;

  // constructor(
  //     public id: number,
  //     public title: string,
  //     public author: string,
  //     public publisher: string,
  //     public publicationDate: string,

  //     public isbn10: string,
  //     public isbn13: string,
  //     public price: number,
  //     public bindingType: number,
  //     public bookCondition: number,
  //     public goodReadsRating: number,
  //     public quantity: number,
  //     public signed: string,
  //     public mainImage: string,
  //     public images: string[],
  //     public edition: number,
  //     public enabled: boolean,
  //     public aboutThisItem: string,

  //     public createdTime: string,
  //     public updatedTime: string,
  //     public category: Category,
  //     public store: Store,
  //     public bookDetails: BookDetails,
  //     init?: Partial<Book>,
  // ) { }
}
