import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartFullComponent } from './cart-full.component';

describe('CartFullComponent', () => {
  let component: CartFullComponent;
  let fixture: ComponentFixture<CartFullComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartFullComponent]
    });
    fixture = TestBed.createComponent(CartFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
