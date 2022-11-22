import { Component, OnInit ,Input, EventEmitter, Output, ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { StudentsService } from 'src/app/modules/dashboard/modules/students/services/students/students.service';
import { IssuanceCertificaeService } from '../../services/issuance-certificae.service';

@Component({
  selector: 'app-add-student-certificate',
  templateUrl: './add-student-certificate.component.html',
  styleUrls: ['./add-student-certificate.component.scss']
})
export class AddStudentCertificateComponent implements OnInit,AfterContentChecked  {
  @Input() student;
 

  @Output() result : EventEmitter<string> = new EventEmitter();
  stdForm: FormGroup;
  constructor(private fb: FormBuilder
    ,private std: StudentsService,
     private _certificate:IssuanceCertificaeService,
      private changeDetector: ChangeDetectorRef) { }
  schoolNames = []
  grades = []
  certificatess = []
  ngOnInit(): void {
    // this.getCertificateManually();
    this.getCertificates();
    this.getSchoolNames();
    // this.getGrades();
    this.stdForm = this.fb.group({
      id: '',
      certificates: this.fb.array([])
    });

    this.addCertificate();
    this.getCertificateManually();
  }

  getSchoolNames() {
    this.std.getAllSchoolNames().subscribe((res) => {
      this.schoolNames = res;
    });
  }
  getGrades() {
    this.std.getAllGrades().subscribe((res) => {
      this.grades = res.data;
    });
  }
  getCertificates() {
    this.std.getAllCertificate().subscribe((res) => {
      this.certificatess = res;
    });
  }
  get certificates(): FormArray {
    return this.stdForm.get('certificates') as FormArray;
  }
 
  newCertificate(): FormGroup {
    return this.fb.group({
      schoolId: '',
      gradeId: '',
      certificateId: ''
    });
  }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  addCertificate() {
    this.certificates.push(this.newCertificate());
  }


  getCertificateManually() {
    this.std.getCetificateManually(this.student.id).subscribe((res) => { 
      if (res && res.length) {

        
        res.forEach((item, index) => {
        //  if(this.student.id == item.id)
          this.stdForm.controls['id'].patchValue(this.student.id)
          this.certificates.at(index).patchValue({
            gradeId: item.gradeName.id,
            certificateId: item.schoolYearName.id,
            schoolId: item.schoolName.id,
          });

          this._certificate.studentArray.push(this.stdForm.value) 
          this.takeSchoolId(item.schoolName.id)
        });

        // console.log(this.certificates.value);
        this.certificates.updateValueAndValidity()
        // console.log(this.certificateFormGrp.value);
        
      }
    })
    
  }

  takeSchoolId(event){
    this.grades = []
    this.std.getGradeBySchoolId(event).subscribe((res)=>{
      this.grades.push(res.data) 
    })
  }

  // sendData(){
  //   console.log("hello");
    
  //   this.result.emit(this.stdForm.value)
  // }


}
