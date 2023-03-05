import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeCertificateComponent } from './degree-certificate.component';

describe('DegreeCertificateComponent', () => {
  let component: DegreeCertificateComponent;
  let fixture: ComponentFixture<DegreeCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegreeCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreeCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
