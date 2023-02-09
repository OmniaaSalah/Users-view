import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Student } from 'src/app/core/models/student/student.model';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, OnDestroy {
  @Input('formGroup') studentForm:FormGroup
  get claimsEnum(){ return ClaimsEnum }
  
  student$: Observable<Student> = this.childService.Student$

  isAccountantCommentModel=false
  
  constructor(public childService:RegisterChildService,) { }
  
  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.childService.onPaymentsEditMode$.next(false)
  }

}
