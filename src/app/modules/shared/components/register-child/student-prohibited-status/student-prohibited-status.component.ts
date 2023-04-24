import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Mode } from 'src/app/core/models/global/global.model';
import { Student } from 'src/app/core/models/student/student.model';
import { ClaimsService } from 'src/app/core/services/claims.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-student-prohibited-status',
  templateUrl: './student-prohibited-status.component.html',
  styleUrls: ['./student-prohibited-status.component.scss']
})
export class StudentProhibitedStatusComponent implements OnInit {
  @Input('formGroup') studentForm:FormGroup
  @Input('mode') mode : Mode= 'view'
  @Output() modeChange = new EventEmitter();
  @Output() onFormSubmitted = new EventEmitter();

  lang =inject(TranslationService).lang;
  get claimsEnum(){ return ClaimsEnum }
  get scopeEnum(){ return UserScope }
  currentUserScope = inject(UserService).getCurrentUserScope()

  isAllowedToUpdateIssueCertificate = this.claimsService.isUserAllowedTo([ClaimsEnum.S_U_ProhibitedFromIssueeCertificateFromSpea, ClaimsEnum.SE_U_ProhibitedFromIssueeCertificateFromSchool])
  isAllowedToUpdateWithdraw = this.claimsService.isUserAllowedTo([ClaimsEnum.S_U_ProhibitedFromWithdrawingFromSpea, ClaimsEnum.SE_U_ProhibitedFromWithdrawingFromSchool])


  booleanOptions = this.sharedService.booleanOptions

  student$: Observable<Student> = this.childService.Student$

  constructor(
    private claimsService:ClaimsService,
    public childService:RegisterChildService,
    private sharedService: SharedService,) { }

  ngOnInit(): void {
  }

}
