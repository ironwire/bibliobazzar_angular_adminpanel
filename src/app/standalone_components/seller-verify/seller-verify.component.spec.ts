import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerVerifyComponent } from './seller-verify.component';

describe('SellerVerifyComponent', () => {
  let component: SellerVerifyComponent;
  let fixture: ComponentFixture<SellerVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerVerifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
