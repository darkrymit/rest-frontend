import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteListComponent } from './infinite-list.component';

describe('InfiniteListComponent', () => {
  let component: InfiniteListComponent;
  let fixture: ComponentFixture<InfiniteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfiniteListComponent],
    });
    fixture = TestBed.createComponent(InfiniteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
