import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RegistrationStatus } from '../../enums/status/status.enum';

@Component({
  selector: 'app-card-student',
  templateUrl: './card-student.component.html',
  styleUrls: ['./card-student.component.scss']
})
export class CardStudentComponent implements OnInit {
  isChecked = false
  get registrationStatusEnum() {return RegistrationStatus}
  
  @Input() student : any
  @Input() set choosenStudents(students:any[]){
    if(students.length && students){
      students.forEach(student=>{
        if(student.id == this.student.id){
          this.isChecked = true
        }
      })
    }
  }
  @Output() addStudent = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
 
  increaseOrDecrease(event){
      this.addStudent.emit(event.target.checked)
  }

}
