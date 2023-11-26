import { Component, EventEmitter, Input, OnInit,Output,inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DivisionService } from 'src/app/modules/schools/services/division/division.service';
import { faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import { GradesService } from 'src/app/modules/schools/services/grade/grade.service';
import { map } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
@Component({
  selector: 'app-division-modal',
  templateUrl: './division-modal.component.html',
  styleUrls: ['./division-modal.component.scss']
})
export class DivisionModalComponent implements OnInit {
  @Input()schoolId;
  @Input()classId;
  @Input() isOpen =false
  @Output() onDivisionModelClosed= new EventEmitter<any>();

  lang = inject(TranslationService).lang
  exclamtionIcon=faExclamationCircle;
  isBtnLoading:boolean=false;
  gradesList=[];
  divisionFormGrp:FormGroup;
  constructor(private fb:FormBuilder,private divisionService:DivisionService,private gradesService:GradesService) {

  }

  ngOnInit(): void {
    this.initForm();
    this.gradesService.getSchoolGardes(this.schoolId).pipe(map(res=>res.data)).subscribe(res=>{this.gradesList=res;})
  }

  get maxStudentCount() {
    return this.divisionFormGrp.controls['maxStudentCount']  as FormControl;
  }
  get divisionNumber() {
    return this.divisionFormGrp.controls['divisionNumber'] as FormControl;
  }
  get isSpecialAbilities() {
    return this.divisionFormGrp.controls['isSpecialAbilities'] as FormControl;
  }
  get studentToleranceCount() {
    return this.divisionFormGrp.controls['studentToleranceCount'] as FormControl;
  }
  get gradeId() {
    return this.divisionFormGrp.controls['gradeId'] as FormControl;
  }
  get code() {
    return this.divisionFormGrp.controls['code'] as FormControl;
  }
  get arabicName() {
    return this.divisionFormGrp.controls['arabicName'] as FormControl;
  }
  get englishName() {
    return this.divisionFormGrp.controls['englishName'] as FormControl;
  }

  initForm(){
    this.divisionFormGrp= this.fb.group({

      arabicName:['',[Validators.required]],
      englishName:['',[Validators.required]],
      code: ['',[Validators.required]],
      gradeId:[this.classId?this.classId:'',[Validators.required]],
      schoolId:[Number(this.schoolId),[Validators.required]],
      studentToleranceCount:['',[Validators.required]],
      isSpecialAbilities: [false,[Validators.required]],
      divisionNumber: ['',[Validators.required]],
      maxStudentCount: ['',[Validators.required]],



    });
  }

  onModelClosed(){
    this.divisionFormGrp.reset();
    Object.keys( this.divisionFormGrp.controls).forEach((key) => {
      const control = this.divisionFormGrp.controls[key];
      control.markAsPristine();
      control.markAsUntouched();
    });

    this.isSpecialAbilities.setValue(false);
    if(this.classId) this.gradeId.setValue(this.classId);
    this.onDivisionModelClosed.emit()
  }

  saveDivision(){
   this.isBtnLoading=true;
   this.divisionService.addDivision(this.divisionFormGrp.value).subscribe((res)=>{
    this.isBtnLoading=false;
    this.onDivisionModelClosed.emit()
   },(err)=>{
    this.isBtnLoading=false;
   })
  }

}
