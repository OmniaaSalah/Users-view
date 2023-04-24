import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/modules/shared/components/register-child/school-record/school-record.component.spec.ts
import { SchoolRecordComponent } from './school-record.component';

describe('SchoolRecordComponent', () => {
  let component: SchoolRecordComponent;
  let fixture: ComponentFixture<SchoolRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolRecordComponent);
========
import { SelectSchoolsComponent } from './select-schools.component';

describe('SelectSchoolsComponent', () => {
  let component: SelectSchoolsComponent;
  let fixture: ComponentFixture<SelectSchoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSchoolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSchoolsComponent);
>>>>>>>> a35bd598a2efbeda37acf7487b4e5d9969c1d7a8:src/app/shared/components/select-schools/select-schools.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
