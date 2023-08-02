import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateMiniSmartCardComponent } from './certificate-mini-smart-card.component';

describe('CertitficateMiniSmartComponent', () => {
  let component: CertificateMiniSmartCardComponent;
  let fixture: ComponentFixture<CertificateMiniSmartCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateMiniSmartCardComponent],
    });
    fixture = TestBed.createComponent(CertificateMiniSmartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
