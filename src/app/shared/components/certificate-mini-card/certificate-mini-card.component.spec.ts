import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateMiniCardComponent } from './certificate-mini-card.component';

describe('CertificateMiniCardComponent', () => {
  let component: CertificateMiniCardComponent;
  let fixture: ComponentFixture<CertificateMiniCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateMiniCardComponent],
    });
    fixture = TestBed.createComponent(CertificateMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
