import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from 'src/app/core/models/student/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  loading$ = new BehaviorSubject(false)
  Student$ = new BehaviorSubject<Student>(null)

  constructor() { }
}
