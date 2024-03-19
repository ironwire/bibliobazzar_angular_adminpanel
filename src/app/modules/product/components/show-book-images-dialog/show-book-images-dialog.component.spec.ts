import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBookImagesDialogComponent } from './show-book-images-dialog.component';

describe('ShowBookImagesDialogComponent', () => {
  let component: ShowBookImagesDialogComponent;
  let fixture: ComponentFixture<ShowBookImagesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowBookImagesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowBookImagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
