import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCertificateComponent } from './board-certificate.component';

describe('BoardCertificateComponent', () => {
  let component: BoardCertificateComponent;
  let fixture: ComponentFixture<BoardCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
