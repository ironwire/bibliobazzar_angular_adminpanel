import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSellersComponent } from './book-sellers.component';

describe('BookSellersComponent', () => {
  let component: BookSellersComponent;
  let fixture: ComponentFixture<BookSellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookSellersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
