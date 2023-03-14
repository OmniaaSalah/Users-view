import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaCertificateComponent } from './diploma-certificate.component';

describe('DiplomaCertificateComponent', () => {
  let component: DiplomaCertificateComponent;
  let fixture: ComponentFixture<DiplomaCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiplomaCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiplomaCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
