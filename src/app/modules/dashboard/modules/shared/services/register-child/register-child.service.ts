import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Student } from 'src/app/core/models/student/student.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterChildService {

  onEditMode$= new BehaviorSubject(false)
  submitBtnClicked$ = new Subject()


  Student$ = new BehaviorSubject<Student>(null)

  constructor() { }
}
