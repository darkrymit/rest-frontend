import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemSmartComponent } from './order-item-smart.component';

describe('OrderItemSmartComponent', () => {
  let component: OrderItemSmartComponent;
  let fixture: ComponentFixture<OrderItemSmartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderItemSmartComponent]
    });
    fixture = TestBed.createComponent(OrderItemSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
