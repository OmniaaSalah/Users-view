import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualCertificatesComponent } from './manual-certificates.component';

describe('IssuanceOfACertificateComponent', () => {
  let component: ManualCertificatesComponent;
  let fixture: ComponentFixture<ManualCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
