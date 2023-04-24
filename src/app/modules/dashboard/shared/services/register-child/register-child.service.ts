import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from 'src/app/core/models/student/student.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterChildService {

  onEditMode$= new BehaviorSubject(false) // will show Save Button to submit student Main info the form
  onPaymentsEditMode$= new BehaviorSubject(false)// will show Save Button to submit the student Medical File form
  submitBtnClicked$ = new BehaviorSubject(false) // triggered if you click the Save button

  loading$ = new BehaviorSubject(false)

  Student$ = new BehaviorSubject<Student>(null)
  constructor() { }
}
