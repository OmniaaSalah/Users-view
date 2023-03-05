import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuanceCertificateComponent } from './issuance-certificate.component';

describe('AskForIssuanceOfACertificateComponent', () => {
  let component: IssuanceCertificateComponent;
  let fixture: ComponentFixture<IssuanceCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuanceCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuanceCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
