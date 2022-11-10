import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

@Component({
  selector: 'app-ask-for-issuance-of-a-certificate',
  templateUrl: './ask-for-issuance-of-a-certificate.component.html',
  styleUrls: ['./ask-for-issuance-of-a-certificate.component.scss'],
})
export class AskForIssuanceOfACertificateComponent implements OnInit {
  choosenStudents=[]
  step = true;
  step1 = false;
  step2 = false;
  step3 = false;
  cities=[]
  dropValue= ""
  childList = [
    {
      name: "asfas",
      age:"12sfsa",
      class:"12515",
      shob3a:"sda",
      relaivity:"sadffasd"
    },
    {
      name: "asfas",
      age:"12sfsa",
      class:"12515",
      shob3a:"sda",
      relaivity:"sadffasd"
    }, {
      name: "asfas",
      age:"12sfsa",
      class:"12515",
      shob3a:"sda",
      relaivity:"sadffasd"
    }
  ]
  componentHeaderData: IHeader = {
    breadCrump: [
      {
        label: this.translate.instant(
          'breadcrumb.Request to issue a certificate'
        ),
        routerLink: '/Ask-for-certificate/Ask-For-Issuance-Of-A-Certificate',
        routerLinkActiveOptions: { exact: true },
      },
    ],
    mainTitle: {
      main: this.translate.instant('breadcrumb.Request to issue a certificate'),
    },
  };
  constructor(
    private headerService: HeaderService,
    private translate: TranslateService,
    private fb: FormBuilder
  ) {}
  stdForm: FormGroup;

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  this.stdForm = this.fb.group({
    students: this.fb.array([])
  });
  }

  increaseOrDecrease(checked,student) {
      if(checked){
        this.choosenStudents.push(student)
      }else{
        this.choosenStudents.forEach((item,index) => {
          if(student.name === item.name){ // id instead of name
            this.choosenStudents.splice(index,1)
          }
        });
      }
  }

  checkDropValue(eventValue){
    this.dropValue = eventValue.value.name
  }

  changeRoute(){
    this.step = false
    this.step1 = true
  }
  changeRoute2(){
        // الشغل كله هنا 
    if(this.dropValue == "Rome"){ // شهاده تسلسلي
      console.log(this.dropValue);
      this.step = false
      this.step1 = false
      this.step2 = true
      this.step3 = false
    }  
    if(this.dropValue == "London"){ // شهاده البورد
      console.log(this.dropValue)
      this.step = false
      this.step1 = false
      this.step2 = false
      this.step3 = true
    }    
   
  }
  prevroute(){
    this.step=true;  
      this.step1 = false  
      this.step2 = false
  }
  prevroute2(){
    this.step=false;  
      this.step1 = true  
      this.step2 = false
      this.step3 = false
  }

 
  students(): FormArray {
    return this.stdForm.get('students') as FormArray;
  }
 
  newStudent(): FormGroup {
    return this.fb.group({
      id:1,
      studentInfo: this.fb.array([])
    });
  }
 
  addStudent() {
    this.students().push(this.newStudent());
  }

 
  employeeSkills(empIndex: number): FormArray {
    return this.students()
      .at(empIndex)
      .get('studentInfo') as FormArray;
  }
 
  newSkill(): FormGroup {
    return this.fb.group({
      schoolId: '',
      classId: '',
      schoolYearId: ''
    });
  }
 
  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }
 
}
