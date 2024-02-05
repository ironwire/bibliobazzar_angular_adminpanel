import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewcategoryComponent } from './add-newcategory.component';

describe('AddNewcategoryComponent', () => {
  let component: AddNewcategoryComponent;
  let fixture: ComponentFixture<AddNewcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewcategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
