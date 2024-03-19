import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddNewComponent } from './product-add-new.component';

describe('ProductAddNewComponent', () => {
  let component: ProductAddNewComponent;
  let fixture: ComponentFixture<ProductAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductAddNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
