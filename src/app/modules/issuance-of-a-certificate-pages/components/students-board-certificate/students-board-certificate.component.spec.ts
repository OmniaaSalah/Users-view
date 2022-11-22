import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsBoardCertificateComponent } from './students-board-certificate.component';

describe('StudentsBoardCertificateComponent', () => {
  let component: StudentsBoardCertificateComponent;
  let fixture: ComponentFixture<StudentsBoardCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsBoardCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsBoardCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
