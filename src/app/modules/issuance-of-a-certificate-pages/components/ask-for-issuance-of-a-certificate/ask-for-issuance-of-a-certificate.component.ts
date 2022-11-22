import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IssuanceCertificaeService } from '../../services/issuance-certificae.service';
import { AddStudentCertificateComponent } from '../add-student-certificate/add-student-certificate.component';

@Component({
  selector: 'app-ask-for-issuance-of-a-certificate',
  templateUrl: './ask-for-issuance-of-a-certificate.component.html',
  styleUrls: ['./ask-for-issuance-of-a-certificate.component.scss'],
})
export class AskForIssuanceOfACertificateComponent implements OnInit {
  @ViewChildren(AddStudentCertificateComponent) studentsCertificates: QueryList<AddStudentCertificateComponent>
  choosenStudents = []
  dataArray = []
  display2
  step = true;
  step1 = false;
  step2 = false;
  step3 = false; 
  step4 = false;
  cities = []
  headerModal;
  display: boolean = false;
  dropValue = ""
  childList = []
  boardObj = {}
  degreeForm: FormGroup
  boardForm: FormGroup
  choosenAttachment = []
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
    private issuance: IssuanceCertificaeService,
    private fb: FormBuilder
  ) { }
  boardData = []


  ngOnInit(): void {
    this.getparentsChildren()
    
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.cities = [
      { name: 'New York', id: 'NY' },
      { name: 'Rome', id: 'RM' },
      { name: 'London', id: 'LDN' },
      { name: 'Istanbul', id: 'IST' },
      { name: 'Paris', id: 'PRS' }
    ];

    this.degreeForm = this.fb.group({
      YEAR_Id: '',
      certificateType: ''
    });

    this.boardForm = this.fb.group({
      reason: this.fb.array(['']),
    });

    
  }



  // addAttachment() {
  //   this.attachments.push(this.newCertificate());
  // }

  getBoards() {
    this.choosenStudents.forEach(student => {
      this.issuance.getBoards(student.id).subscribe(attachments => {
        student.attachments = attachments;

      })
    })
  }


  getparentsChildren() {
    this.issuance.getParentsChild().subscribe(res => {
      this.childList = res.students
      // console.log(this.childList);

    })
  }

  
  increaseOrDecrease(checked, student) {
    if (checked) {
      this.choosenStudents.push(student)
    } else {
      this.choosenStudents.forEach((item, index) => {
        if (student.id === item.id) { // id instead of name
          this.choosenStudents.splice(index, 1)
        }
      });
    }
  }

  onReasonChange(reason,i){
    this.boardData[i].reason = reason
  }

  onAttachmentSelected(attachmentId,index){
    let i =  this.boardData[index].attachments.indexOf(attachmentId)
    if( i >= 0 ){
      this.boardData[index].attachments.splice(i,1)
    }else{
      this.boardData[index].attachments.push(attachmentId)
    }
  }

  sendBoardData() {
    localStorage.setItem('boardData',JSON.stringify(this.boardData))
    localStorage.removeItem('degreeData')
    localStorage.removeItem('chainData');
    localStorage.removeItem('otherData');
    this.step1=true;
    this.step3=false
      // console.log(this.boardData)
  }



  checkDropValue(eventValue) {
    this.dropValue = eventValue.value.name
  }

  changeRoute() {
    this.step = false
    this.step1 = true
  }
  changeRoute2() {
    // الشغل كله هنا 
    if (this.dropValue == "Rome") { // شهاده تسلسلي
      console.log(this.dropValue);
      this.step = false
      this.step1 = false
      this.step2 = true
      this.step3 = false
      this.step4 = false
    }
    if (this.dropValue == "London") { // شهاده البورد
      this.getBoards()


      this.boardData = this.choosenStudents.map(element=>{      
        let container = {
           id: element.id,
           certificateType: this.dropValue,
           reason: '',
           attachments: []
         };
         // container.id = element.id
         // container.certificateType = this.dropValue
        //  element.attachments.forEach(item => {
        //    if(item.isSelected == true){
        //      container.attachments.push(item.id)
        //    }
        //  });
         console.log(container);
         console.log(element);
         
          return container    
       })

      // this.getAttachments()
      console.log(this.dropValue)
      this.step = false
      this.step1 = false
      this.step2 = false
      this.step3 = true
      this.step4 = false
    }
    if (this.dropValue == "Istanbul") { // شهاده الدرجات
      console.log(this.dropValue)
      this.step = false
      this.step1 = false
      this.step2 = false
      this.step3 = false
      this.step4 = true
    }
    if (this.dropValue !== "Istanbul" && this.dropValue !== "Rome" && this.dropValue !== "London") {
      this.showDialog()
    }

  }

  showDialog() {
    this.display = true;
    this.headerModal = "هل تريد اصدار شهاده" + this.dropValue;
  }

  showDialog2() {
    this.display2 = true;
    this.headerModal = "طلبك قيد الانتظار هل تريد استكمال الدفع ؟" 
  }
  prevroute() {
    this.step = true;
    this.step1 = false
    this.step2 = false
  }
  prevroute2() {
    this.step = false;
    this.step1 = true
    this.step2 = false
    this.step3 = false
    this.step4 = false
  }

  // getAttachments(){
  //   this.choosenStudents.forEach(res=>{
  //     this.issuance.getBoards(res.id).subscribe(item=>{
  //       console.log(item);

  //     })
  //   })
  // }

  // sendDataFromParent(event,index){
  //   console.log(event);
  //   this.dataArray[index]=event
  // }

  postData() {
    let data =[]
    this.studentsCertificates.forEach(x => {
     data.push(x.stdForm.value)
    }) 
    data.map(item=>{
      item.certificateType = this.dropValue
    })

    localStorage.setItem('chainData',JSON.stringify(data))
    localStorage.removeItem('degreeData')
    localStorage.removeItem('boardData');
    localStorage.removeItem('otherData');

    this.step1=true;
    this.step2 = false;

    // console.log(data);
    
  }

  sendDegreeForm() {  
    this.dropValue = "Istanbul"
    let studentsId = []
    this.choosenStudents.forEach(res => {
      studentsId.push(res.id)
    })

    
    let data = {
      "Students_Id": studentsId,
      "certificateType": this.dropValue, // error/undefined////////////////////////////////////////////
      "Year_Id": this.degreeForm.value.YEAR_Id,
      "certificateGradeType": this.degreeForm.value.certificateType
    }
    console.log(data);
    
    localStorage.setItem('degreeData',JSON.stringify(data))
    localStorage.removeItem('chainData')
    localStorage.removeItem('boardData');
    localStorage.removeItem('otherData');
    this.step1=true;
    this.step4 = false;
    // console.log(data);

  }

  removeStudent(student,i){
    let data;
    let takenStuden
   
    this.choosenStudents.forEach(std=>{
      takenStuden = std
      if(student.id == std.id){
        this.choosenStudents.splice(i,1)
      }
    })

    if(localStorage.getItem('chainData')){
      data  = JSON.parse(localStorage.getItem('chainData'))
      data.forEach((element,i) => {
          if(element.id == takenStuden.id){
            data.splice(i,1)
            localStorage.setItem('chainData',JSON.stringify(data))
            if(data.length==0) localStorage.removeItem('chainData')
          }          
      });
    }

    if(localStorage.getItem('degreeData')){
      data  = JSON.parse(localStorage.getItem('degreeData'))
      data['Students_Id'].forEach((element,i) => {
        if(element == takenStuden.id){
          data['Students_Id'].splice(i,1)
          localStorage.setItem('degreeData',JSON.stringify(data))
          if(data['Students_Id'].length==0) localStorage.removeItem('degreeData')
        }          
    });
    }

    if(localStorage.getItem('boardData')){
      data  = JSON.parse(localStorage.getItem('boardData'))
      data.forEach((element,i) => {
        if(element.id == takenStuden.id){
          data.splice(i,1)
          localStorage.setItem('boardData',JSON.stringify(data))
          if(data.length==0) localStorage.removeItem('boardData')
        }          
    });
    }


    if(localStorage.getItem('otherData')){
      data  = JSON.parse(localStorage.getItem('otherData'))
      data['Students_Id'].forEach((element,i) => {
        if(element == takenStuden.id){
          data['Students_Id'].splice(i,1)
          localStorage.setItem('otherData',JSON.stringify(data))
          if(data['Students_Id'].length==0) localStorage.removeItem('otherData')
        }          
    });
    }


  }



  sendOtherCertificates(){
    let data = {
      "Students_Id" : this.choosenStudents.map(er=>er.id),
      "certificateType": this.dropValue
    }
    localStorage.setItem('otherData',JSON.stringify(data))
  }


  payFunc(){
    this.showDialog2()
  }

}
