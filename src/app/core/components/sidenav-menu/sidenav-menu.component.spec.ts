import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavMenuComponent } from './sidenav-menu.component';

describe('SidenavContentComponent', () => {
  let component: SidenavMenuComponent;
  let fixture: ComponentFixture<SidenavMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavMenuComponent],
    });
    fixture = TestBed.createComponent(SidenavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
