import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemSmartComponent } from './cart-item-smart.component';

describe('CartItemSmartComponent', () => {
  let component: CartItemSmartComponent;
  let fixture: ComponentFixture<CartItemSmartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartItemSmartComponent]
    });
    fixture = TestBed.createComponent(CartItemSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
