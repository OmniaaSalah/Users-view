import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatesRequestDetailsComponent } from './certificates-request-details.component';

describe('CertificatesRequestDetailsComponent', () => {
  let component: CertificatesRequestDetailsComponent;
  let fixture: ComponentFixture<CertificatesRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificatesRequestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificatesRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
