import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Mode } from 'src/app/core/models/global/global.model';
import { Student } from 'src/app/core/models/student/student.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { RegistrationStatus, StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IndexesService } from '../../../../indexes/service/indexes.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';


@Component({
  selector: 'app-accept-information',
  templateUrl: './accept-information.component.html',
  styleUrls: ['./accept-information.component.scss']
})
export class AcceptInformationComponent implements OnInit {
  @Input('formGroup') studentForm:FormGroup
  @Input('mode') mode : Mode= 'view'
  @Output() modeChange = new EventEmitter();
  @Output() onFormSubmited = new EventEmitter();
  
  get claimsEnum() {return ClaimsEnum}
  
  lang =inject(TranslationService).lang;
  booleanOptions = this.sharedService.booleanOptions
  educationType$ = this.indexService.getIndext(IndexesEnum.SpecialEducation)

  get registrationStatusEnum() {return RegistrationStatus}

  constructor(
    public childService:RegisterChildService,
    private sharedService:SharedService,
    private indexService :IndexesService) { }

  student$: Observable<Student> = this.childService.Student$

  ngOnInit(): void {
  }


  onSpecialEducationChanged(val:boolean){
    if(!val) this.studentForm.controls['specialEducation'].setValue(null) 
  }
}
