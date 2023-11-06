import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionsListComponent } from './divisions-list.component';

describe('SchoolDivisionsComponent', () => {
  let component: DivisionsListComponent;
  let fixture: ComponentFixture<DivisionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
