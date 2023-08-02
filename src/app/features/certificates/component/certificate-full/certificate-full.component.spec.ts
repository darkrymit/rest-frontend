import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateFullComponent } from './certificate-full.component';

describe('CertitficateFullComponent', () => {
  let component: CertificateFullComponent;
  let fixture: ComponentFixture<CertificateFullComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateFullComponent],
    });
    fixture = TestBed.createComponent(CertificateFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
