import { Component, OnInit ,Input, EventEmitter, Output, ChangeDetectorRef, AfterContentChecked, inject} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { SchoolsService } from 'src/app/modules/dashboard/modules/schools/services/schools/schools.service';
import { StudentsService } from 'src/app/modules/dashboard/modules/students/services/students/students.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IssuanceCertificaeService } from '../../../services/issuance-certificae.service';

@Component({
  selector: 'app-add-student-certificate',
  templateUrl: './add-student-certificate.component.html',
  styleUrls: ['./add-student-certificate.component.scss']
})
export class AddStudentCertificateComponent implements OnInit,AfterContentChecked  {
  @Input() student;
  @Output() result : EventEmitter<string> = new EventEmitter();
  lang = inject(TranslationService).lang

  schoolYearsList;

  studentSchoolYears


  stdForm: FormGroup = this.fb.group({
    id: '',
    certificates: this.fb.array([])
  });
  
  get certificates(): FormArray {
    return this.stdForm.get('certificates') as FormArray;
  }


  constructor(private fb: FormBuilder,
    private sharedService:SharedService,
    private std: StudentsService,
    private _certificate:IssuanceCertificaeService,
    private route:ActivatedRoute,
    private schoolsService: SchoolsService,
    private changeDetector: ChangeDetectorRef)
  { }


  schoolNames = []
  grades = []
  certificatess = []

  reqInstance = this.route.snapshot.queryParamMap.get('requestInstance')
  returnedReqData = JSON.parse(localStorage.getItem('returnedRequest'))


  ngOnInit(): void {
    if(this.reqInstance){
      this.getSchoolYearsList();
      this.getSchoolNames();
      this.addCertificate();

      this.patchReturnedRequestData(this.returnedReqData)

      this.patchForm(this.returnedReqData)
    }else{

      this.getSchoolYearsList();
      this.getSchoolNames();
      this.addCertificate();
      this.getCertificateManually();
    }

    
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  
  patchReturnedRequestData(reqData){
    // this.editHolidayForm.patchValue({...reqData,dateFrom:new Date(reqData.dateFrom),dateTo:new Date(reqData.dateTo)})
  }
  

 
  newCertificate(): FormGroup {
    return this.fb.group({
      schoolId: '',
      gradeId: '',
      yearId: ''
    });
  }

  addCertificate() {    
    this.certificates.push(this.newCertificate());
  }


  getCertificateManually() {
    this.std.getCetificateManually(this.student.id).subscribe((res) => { 
      this.studentSchoolYears = res
    //  this.patchForm(res)
    })
    
  }


  patchForm(res){
    if (res && res.length) {

      res.forEach((item, index) => {
      //  if(this.student.id == item.id)
        this.stdForm.controls['id'].patchValue(this.student?.id || item.id)
        
        this.certificates.at(index).patchValue({
          gradeId: item.gradeName?.id || 1,
          yearId: item.schoolYearName?.id || 1,
          schoolId: item.schoolName?.id || 2,
        });

        this._certificate.studentArray.push(this.stdForm.value) 
        this.takeSchoolId(item.schoolName.id || 2)
      });

      this.certificates.updateValueAndValidity()
      
    }
  }


  takeSchoolId(event){
    this.grades = []
    this.std.getGradeBySchoolId(event).subscribe((res)=>{
      this.grades.push(res.data) 
    })
  }



  
  getSchoolNames() {
    this.schoolsService.getAllSchoolNames().subscribe((res) => {
      this.schoolNames = res;
    });
  }


  getGrades() {
    this.std.getAllGrades().subscribe((res) => {
      this.grades = res.data;
    });
  }

  getSchoolYearsList(){
    this.sharedService.getSchoolYearsList().subscribe((res)=>{ this.schoolYearsList = res })
   }
   


}
