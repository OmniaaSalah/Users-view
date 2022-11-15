import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { IssuanceCertificaeService } from '../../services/issuance-certificae.service';

@Component({
  selector: 'app-ask-for-issuance-of-a-certificate',
  templateUrl: './ask-for-issuance-of-a-certificate.component.html',
  styleUrls: ['./ask-for-issuance-of-a-certificate.component.scss'],
})
export class AskForIssuanceOfACertificateComponent implements OnInit {
  choosenStudents = []
  dataArray = []
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
      id: '',
      reason: '',
      attachments: this.fb.array([])
    });
  }

  get attachments(): FormArray {
    return this.boardForm.get('attachments') as FormArray;
  }

  // addAttachment() {
  //   this.attachments.push(this.newCertificate());
  // }

  getBoards() {
    this.choosenStudents.forEach(res => {
      this.issuance.getBoards(res.id).subscribe(element => {
        // console.log(element);

        Object.assign(this.boardObj, { [res.id]: element })
        // console.log(this.boardObj);

      })
    })
  }

  getStudentBoard(id) {
    // console.log(this.boardObj);

    return this.boardObj[id]
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
  x = []

  addAttachmentForParent(event, elitem, student) {
    if(this.x.length == 0){
      this.x.push({
        id: student.id,
        attachments: [elitem.id]
      })
    }
    else {
      this.x.forEach((element,index)=>{        
        if(element.id == student.id){
          this.x[index].attachments.find((item,i) => {

            // console.log("element",element);  //{id: 19, attachments: Array(1)}
            // console.log("item",item); //3
            // console.log("elitem",elitem);  //{id: 4, path: 'url2', comment: 'Comment2', name: {…}, onerId: 19, …}
            
            if(item == elitem.id){
              console.log("yes equal");
              console.log(item);
              this.x[index].attachments.splice(item,1) // error
            } else if (item != elitem.id && !this.x[index].attachments.includes(elitem.id)){
              console.log("not equal");
              this.x[index].attachments.push(elitem.id)
            }
          });
          
        } else{
          this.x.push({
            id: student.id,
            attachments: [elitem.id]
          })
        }
      })

    }
 
    

  }

  sendBoardData() {
    this.choosenStudents.forEach(res => {
      this.boardForm.controls['id'].patchValue(res.id)
    })
    console.log(this.boardForm.value);

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
    // let i = []
    // this.dataArray.forEach((item,index)=>{
    //     i.push(item.value)
    // })
    // console.log(i);
    this.issuance.studentArray.forEach((item, index) => {
      // console.log(item);

      this.dataArray.push(item)
    })
    console.log(this.dataArray);
  }

  sendDegreeForm() {
    let studentsId = []
    this.choosenStudents.forEach(res => {
      studentsId.push(res.id)
    })
    let data = {
      "Students_Id": studentsId,
      "Year_Id": this.degreeForm.value.YEAR_Id,
      "certificateType": this.degreeForm.value.certificateType
    }
    console.log(data);

  }

}
