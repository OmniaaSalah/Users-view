import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Student } from 'src/app/core/models/student/student.model';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { StudentService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, OnDestroy {
  @Input('formGroup') studentForm:FormGroup

  @Output() onFormSubmitted = new EventEmitter()

  @Input() mode : 'edit'| 'view'= 'view'
  @Output() modeChange = new EventEmitter();

  get claimsEnum(){ return ClaimsEnum }

  student$: Observable<Student> = this.childService.Student$

  isAccountantCommentModel=false

  constructor(public childService:StudentService,) { }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
  }

}
