import { SelectItem } from 'primeng/api';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren,inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Dropdown } from 'primeng/dropdown';
import { IHeader } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { IssuanceCertificaeService } from '../../services/issuance-certificae.service';
import { AddStudentCertificateComponent } from '../add-student-certificate/add-student-certificate.component';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { IndexesService } from 'src/app/modules/dashboard/modules/indexes/service/indexes.service';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { isNgTemplate } from '@angular/compiler';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Component({
  selector: 'app-ask-for-issuance-of-a-certificate',
  templateUrl: './ask-for-issuance-of-a-certificate.component.html',
  styleUrls: ['./ask-for-issuance-of-a-certificate.component.scss'],
})
export class AskForIssuanceOfACertificateComponent implements OnInit {
  @ViewChildren(AddStudentCertificateComponent) studentsCertificates: QueryList<AddStudentCertificateComponent>
  choosenStudents = []
  lang =inject(TranslationService).lang;
  currentLang = localStorage.getItem('preferredLanguage')
  skeletonShown = true
  // cloneArray=[]
  @ViewChild('dropDownThing')dropDownThing: Dropdown;
  @ViewChild('dropdown')dropdown: Dropdown;
  certificates=[
    {name:{en:'MinisterialSubjects',ar:'المواضيع الوزارية'},value:0},
    {name:{en:'NonMinisterialSubjects',ar:'الموضوعات غير الوزارية'},value:1},
    {name:{en:'AllSubjects',ar:'كل المواضيع'},value:2},
  ];
  valueOfEnum;
  attachmentsNumbers=0
  showDegree:boolean = false
  showOther:boolean = false
  showBoard:boolean = false
  showChain:boolean = false
  showHabit:boolean = false
  dataArray = []
  reasonArr = [];
  certificateName;
  saveBtn:boolean = false
  display2
  step = true;
  step1 = false;
  step2 = false;
  step3 = false; 
  step4 = false;
  headerModal;
  display: boolean = false;
  dropValue = ""
  dropId;
  fess = 0;
  nameOfCertificate;
  nameOfStudent;
  allCost =0;
 boardStorage 
 degreeStorage 
 otherStorage 
 chainStorage
 habitStorage
 faAngleDown = faAngleDown


 boardCase:"board" | "chain" | "degree" | "other" | "habit" | "pay" = null




  childList = []
  boardObj = {}
  degreeForm: FormGroup
  boardForm: FormGroup
  habitForm: FormGroup
  dropForm: FormGroup
  boardArr =[]
  choosenAttachment = []
  certificatesList ;
  certificatesFeesList;
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
    private fb: FormBuilder,
    public confirmModelService: ConfirmModelService,
    private index:IndexesService
  ) { }
  boardData = []


  ngOnInit(): void {
    this.certificatesFeesList=this.issuance.certificatesFeesList;
    this.certificatesList=this.issuance.certificatesList
    this.getparentsChildren()
    this.confirmModelListener()
    this.headerService.changeHeaderdata(this.componentHeaderData);
  
    this.degreeForm = this.fb.group({
      YEAR_Id: '',
      certificateType: ''
    });

    this.boardForm = this.fb.group({
      reason: this.fb.array(['']),
    });

    this.habitForm = this.fb.group({
      destination:''
    })

    this.dropForm = this.fb.group({
      controlVal :''
    })
  }

  checkEnumValue(enumObject){
    this.valueOfEnum = enumObject.value.value
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

  getReasonBoard(){
    this.index.getIndext(IndexesEnum.ReasonsForIssuingBoardCertificate).subscribe(res=>{
      this.boardArr = res
    })
  }


  getparentsChildren() {
    this.issuance.getParentsChild().subscribe(res => {
      this.childList = res.students
      this.skeletonShown = false
      // console.log(this.childList);
    })
  }

  
  increaseOrDecrease(checked, student) {
    if (checked) {
      this.choosenStudents.push(student)
      // this.cloneArray = [...this.choosenStudents]
    } else {
      this.choosenStudents.forEach((item, index) => {
        if (student.id === item.id) { // id instead of name
          this.choosenStudents.splice(index, 1)
          // this.cloneArray = [...this.choosenStudents]
        }
      });
    }
  }

  onReasonChange(reason,i){
    this.boardData[i].reason = reason

    this.reasonArr.push(reason)
    console.log(this.reasonArr);
    if(this.choosenStudents.length == this.reasonArr.length) this.saveBtn = true
    
  }

  onAttachmentSelected(attachmentId,index){
    console.log(attachmentId);
    
    let i =  this.boardData[index].attachments.indexOf(attachmentId)
    if( i >= 0 ){
      this.boardData[index].attachments.splice(i,1)
      this.attachmentsNumbers-- ;
    }else{
      this.boardData[index].attachments.push(attachmentId)
      this.attachmentsNumbers++ ;
    }
  }




  boardFunc(){    
    localStorage.setItem('boardData',JSON.stringify(this.boardData))
    localStorage.removeItem('degreeData')
    localStorage.removeItem('chainData');
    localStorage.removeItem('otherData');
    localStorage.removeItem('habitData')
    this.step1=true;
    this.step3=false
    JSON.parse(localStorage.getItem('boardData')).forEach(element => {
      this.certificatesList.find(item=>{
        if(element.certificateType == item.value) {
          this.fess = this.getFees(item.name.en);
          this.nameOfCertificate = item.name.ar
        }
      })
    });
    this.boardStorage = JSON.parse(localStorage.getItem('boardData'))
    this.boardStorage.forEach(element=>{
     this.choosenStudents.forEach(item=>{
       if(element.id == item.id) {
         element.name = item.name.ar
       }
     })
    })
    this.allCost = this.fess * this.boardStorage.length
    this.chainStorage = []    
    this.otherStorage = {}
    this.degreeStorage = {}
    this.showHabit = false
    this.display = false

    this.showBoard = true
    this.showOther = false
    this.showChain = false
    this.showDegree = false
 
    // this.dropValue = ''
    this.attachmentsNumbers=0
    this.reasonArr = []
    this.saveBtn = false
  }


  sendBoardData() {
    this.getCertificateName();
    this.boardCase = 'board'
    if(localStorage.getItem('otherData') || localStorage.getItem('chainData') || localStorage.getItem('degreeData') || localStorage.getItem('habitData') || localStorage.getItem('boardData')){
      this.confirmModelService.openModel({message:this.translate.instant('dashboard.issue of certificate.do you want')+" "+this.certificateName+" "+this.translate.instant('dashboard.issue of certificate.it will remove previous data')})
    }   else if(localStorage.getItem('boardData')){
      this.confirmModelService.openModel({message:this.translate.instant('dashboard.issue of certificate.do you want')+" "+this.certificateName+" "+this.translate.instant('dashboard.issue of certificate.it will remove previous data')})
    }else{
      this.confirmModelService.openModel({message:this.translate.instant('dashboard.issue of certificate.do you want')+" "+this.certificateName})
    }
  }



  checkDropValue(eventValue) {
    
    console.log(eventValue)
    this.dropId = eventValue
    this.getCertificateName();
    // this.dropValue = eventValue.originalEvent.target.innerText+
  }

  changeRoute() {
    this.step = false
    this.step1 = true
  }
  changeRoute2() {    
    // debugger
   
    if ( this.dropId == 1) { 
     
      this.step = false
      this.step1 = false
      this.step2 = true
      this.step3 = false
      this.step4 = false
    }
    if ( this.dropId == 0) { 
      this.getBoards()
      this.getReasonBoard()

      this.boardData = this.choosenStudents.map(element=>{      
        let container = {
           id: element.id,
           certificateType: this.dropId,
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
 
      this.step = false
      this.step1 = false
      this.step2 = false
      this.step3 = true
      this.step4 = false
    }
    if ( this.dropId == 2) { 
   
      this.step = false
      this.step1 = false
      this.step2 = false
      this.step3 = false
      this.step4 = true
    }
    if ( this.dropId !==0 &&  this.dropId !== 1 &&  this.dropId !== 2&&  this.dropId !== "" &&  this.dropId !== 5) {
      // this.showDialog()
          this.sendOtherCertificates();
    }
    if(this.dropId == 5){
     
      
      this.sendHabitCertificate()
    }
    

  }
  confirmVal
  showDialog() {

    
    this.display = true;
    this.headerModal = this.translate.instant('dashboard.issue of certificate.The name of the entity to which the certificate is to be issued');
    this.habitStorage = {}
    this.showHabit = false
    this.otherStorage = {}
    this.showOther = false
    this.degreeStorage = {}
    this.showDegree = false
    localStorage.removeItem('degreeData')
    localStorage.removeItem('otherData')
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
    this.attachmentsNumbers=0
    this.reasonArr = []
    this.saveBtn = false
    // this.dropValue = ''
    // this.gg.value = this.dropValue
    // this.boardForm.controls['controlVal'].patchValue(this.dropValue)
    this.boardForm.get("controlVal").patchValue(this.dropValue);
  }


  chainFunc(){
    let data =[]
    this.studentsCertificates.forEach(x => {
     data.push(x.stdForm.value)
    }) 
    data.map(item=>{
      item.certificateType = this.dropId
    })

    localStorage.setItem('chainData',JSON.stringify(data))
    localStorage.removeItem('degreeData')
    localStorage.removeItem('boardData');
    localStorage.removeItem('otherData');
    localStorage.removeItem('habitData')

    this.step1=true;
    this.step2 = false;

    JSON.parse(localStorage.getItem('chainData')).forEach(element => {
      this.certificatesList.find(item=>{
        if(element.certificateType == item.value) {
          this.fess = this.getFees(item.name.en);
          this.nameOfCertificate = item.name.ar
        }
      })
    }); 
   this.chainStorage = JSON.parse(localStorage.getItem('chainData'))
   this.chainStorage.forEach(element=>{
    this.choosenStudents.forEach(item=>{
      if(element.id == item.id) {
        element.name = item.name.ar
      }
    })
   })
   this.allCost = this.fess * this.chainStorage.length
   this.boardStorage = []
   this.otherStorage = {}
   this.degreeStorage = {}
   this.showHabit = false
   this.display = false
   this.showChain = true
   this.showBoard = false
    this.showOther = false
    this.showDegree = false
 

 

    // console.log(data);
  }


  postData() {
    this.getCertificateName(); 
    this.boardCase = 'chain'
    if(localStorage.getItem('otherData') || localStorage.getItem('chainData') || localStorage.getItem('degreeData') || localStorage.getItem('boardData') || localStorage.getItem('habitData')){
      this.confirmModelService.openModel({message:this.translate.instant('dashboard.issue of certificate.do you want')+" "+this.certificateName+" "+this.translate.instant('dashboard.issue of certificate.it will remove previous data')})
    }   else if(localStorage.getItem('chainData')){
      this.confirmModelService.openModel({message:this.translate.instant('dashboard.issue of certificate.do you want')+" "+this.certificateName+" "+this.translate.instant('dashboard.issue of certificate.it will remove previous data')})
    }else{
      this.confirmModelService.openModel({message:this.translate.instant('dashboard.issue of certificate.do you want')+" "+this.certificateName})
    }
  }


  degreeFunc(){
    
    let studentsId = []
    this.choosenStudents.forEach(res => {
      studentsId.push(res.id)
    })

    
    let data = {
      "Students_Id": studentsId,
      "certificateType": this.dropId, 
      "Year_Id": this.degreeForm.value.YEAR_Id,
      "certificateGradeType": this.valueOfEnum
    }
    console.log(data);
    
    localStorage.setItem('degreeData',JSON.stringify(data))
    localStorage.removeItem('chainData')
    localStorage.removeItem('boardData');
    localStorage.removeItem('otherData');
    localStorage.removeItem('habitData')
    this.step1=true;
    this.step4 = false;

    
      this.certificatesList.find(item=>{
        if(JSON.parse(localStorage.getItem('degreeData')).certificateType == item.value) {
          this.fess = this.getFees(item.name.en);
          this.nameOfCertificate = item.name.ar
        }
      });
      let studentNames = []
      this.degreeStorage = JSON.parse(localStorage.getItem('degreeData'))

           this.choosenStudents.forEach(item=>{
            data.Students_Id.forEach(element=>{
              if(element == item.id){
                studentNames.push(item.name.ar)
                 this.degreeStorage['names'] = studentNames
              }
            })
       })
 
     

      this.allCost = this.fess * data.Students_Id.length
      this.chainStorage = []
      this.boardStorage = [] 
      this.habitStorage = {}
      this.showHabit = false
      this.display = false
      this.showDegree = true
      this.showBoard = false
      this.showOther = false
      this.showChain = false
   

  
    // console.log(data);

  }
  

  sendDegreeForm() { 
    this.getCertificateName(); 
    this.boardCase = 'degree'
    if(localStorage.getItem('otherData') || localStorage.getItem('chainData') || localStorage.getItem('degreeData') || localStorage.getItem('boardData') || localStorage.getItem('habitData')){ 
      this.confirmModelService.openModel({message:this.translate.instant('dashboard.issue of certificate.do you want')+" "+this.certificateName+" "+this.translate.instant('dashboard.issue of certificate.it will remove previous data')})
    }   else if(localStorage.getItem('degreeData')){
      this.confirmModelService.openModel({message:this.translate.instant('dashboard.issue of certificate.do you want')+" "+this.certificateName+" "+this.translate.instant('dashboard.issue of certificate.it will remove previous data')})
    }else{
      this.confirmModelService.openModel({message:this.translate.instant('dashboard.issue of certificate.do you want')+" "+this.certificateName})
    }
   
  }

  removeStudent(student,i){
   
    if(localStorage.getItem('otherData') || localStorage.getItem('habitData')){
      // return
    }else{
      // this.dropValue =''
    }
    let data;
    
      if(this.showBoard == true){
        data  = JSON.parse(localStorage.getItem('boardData'))
        data.forEach((element,index) => {        
            if(element.id == student.id){
              data.splice(index,1)
  
              this.boardStorage.forEach((res,j)=>{
                if(res.id==element.id){
                  this.boardStorage.splice(i,1)
                  this.allCost = this.fess * this.boardStorage.length
                }
              })
            
              localStorage.setItem('boardData',JSON.stringify(data))
              if(data.length==0) localStorage.removeItem('boardData')
            }          
        });
    }

    if(this.showChain == true){      
      data  = JSON.parse(localStorage.getItem('chainData'))
      data.forEach((element,index) => {        
          if(element.id == student.id){
            data.splice(index,1)

            this.chainStorage.forEach((res,j)=>{
              if(res.id==element.id){
                this.chainStorage.splice(i,1)
                this.allCost = this.fess * this.chainStorage.length
              }
            })
          
            localStorage.setItem('chainData',JSON.stringify(data))
            if(data.length==0) localStorage.removeItem('chainData')
          }          
      });
    }

    if(this.showOther==true){      
      data  = JSON.parse(localStorage.getItem('otherData'))
        data['Students_Id'].forEach((element,index) => {
          if(element == student){
            data['Students_Id'].splice(index,1)

            this.otherStorage.Students_Id.splice(index,1)
            this.otherStorage.names.splice(index,1) 
            this.allCost = this.fess * this.otherStorage.names.length
            localStorage.setItem('otherData',JSON.stringify(data))
            if(data['Students_Id'].length==0) localStorage.removeItem('otherData')
          }          
      });
    }



    if(this.showDegree==true){      
      data  = JSON.parse(localStorage.getItem('degreeData'))
        data['Students_Id'].forEach((element,index) => {
          if(element == student){
            data['Students_Id'].splice(index,1)

            this.degreeStorage.Students_Id.splice(index,1)
            this.degreeStorage.names.splice(index,1) 
            this.allCost = this.fess * this.degreeStorage.names.length
            localStorage.setItem('degreeData',JSON.stringify(data))
            if(data['Students_Id'].length==0) localStorage.removeItem('degreeData')
          }          
      });
    }



    if(this.showHabit==true){      
      data  = JSON.parse(localStorage.getItem('habitData'))
        data['Students_Id'].forEach((element,index) => {
          if(element == student){
            data['Students_Id'].splice(index,1)

            this.habitStorage.Students_Id.splice(index,1)
            this.habitStorage.names.splice(index,1) 
            this.allCost = this.fess * this.habitStorage.names.length
            localStorage.setItem('habitData',JSON.stringify(data))
            if(data['Students_Id'].length==0) localStorage.removeItem('habitData')
          }          
      });
    }

  }

  otherFunc(){
    localStorage.removeItem('otherData')
    localStorage.removeItem('chainData')
    localStorage.removeItem('degreeData')
    localStorage.removeItem('boardData')
    localStorage.removeItem('habitData')
    let data = {
      "Students_Id" : this.choosenStudents.map(er=>er.id),
      "certificateType": this.dropId
    }
    localStorage.setItem('otherData',JSON.stringify(data))
    
    // this.display = false
 
      this.certificatesList.find(item=>{
        if(JSON.parse(localStorage.getItem('otherData')).certificateType == item.value) {
          this.fess = this.getFees(item.name.en);
          this.nameOfCertificate = item.name.ar
        }
      }) 
      let studentNames = []
      this.otherStorage = JSON.parse(localStorage.getItem('otherData'))
      this.choosenStudents.forEach(item=>{
        data.Students_Id.forEach(element=>{
          if(element == item.id){
            studentNames.push(item.name.ar)
            this.otherStorage['names'] = studentNames
          }
        })
      })
      console.log(this.otherStorage);
      
      this.allCost = this.fess * data.Students_Id.length
   
      this.chainStorage = []
      this.boardStorage = []
      this.habitStorage = {}
      this.showHabit = false
      this.display = false
      this.showOther = true
      this.showBoard = false
      this.showChain = false
      this.showDegree = false
    

  }

  confirmModelListener(){
    this.confirmModelService.confirmed$.subscribe(result=>{
 
      console.log(this.boardCase);

      if(result){
        
          if(this.boardCase=='board'){
            this.boardFunc()
          }
          else if(this.boardCase == 'chain'){
            this.chainFunc()
          }
          else if(this.boardCase == 'degree'){
            this.degreeFunc()
          } else if(this.boardCase == 'habit') {            
            this.showDialog()
          } else if(this.boardCase == 'other') {
            this.otherFunc()
          } else if(this.boardCase == 'pay'){
              this.payFunc()
            if(result==true){
              window.open('https://www.google.com/','_blank')
              // localStorage.removeItem('otherData')
              // localStorage.removeItem('chainData')
              // localStorage.removeItem('degreeData')
              // localStorage.removeItem('boardData')
              // localStorage.removeItem('habitData')
            } else{
              return
            }
              
           
          }
      }
    })
  }

  sendOtherCertificates(){    
   
    this.getCertificateName();
    this.boardCase = 'other'
    if(localStorage.getItem('otherData') || localStorage.getItem('chainData') || localStorage.getItem('degreeData') || localStorage.getItem('boardData') || localStorage.getItem('habitData')){
      this.confirmModelService.openModel({message:this.translate.instant('dashboard.issue of certificate.do you want')+" "+this.certificateName+" "+this.translate.instant('dashboard.issue of certificate.it will remove previous data')})
    }   else if(localStorage.getItem('otherData')){
      this.confirmModelService.openModel({message:this.translate.instant('dashboard.issue of certificate.do you want')+" "+this.certificateName+" "+this.translate.instant('dashboard.issue of certificate.it will remove previous data')})
    }else{
      this.confirmModelService.openModel({message:this.translate.instant('dashboard.issue of certificate.do you want')+" "+this.certificateName})
    }
    }


  payFunc(){
    // debugger
    this.boardCase = 'pay'
    this.confirmModelService.openModel({message:'طليك قيد الانتظار هل تريد استكمال الدفع ؟'});

  }

  habitFunc(){

    let data = {
      "destination": this.habitForm.value.destination,
      "Students_Id" : this.choosenStudents.map(er=>er.id),
      "certificateType": this.dropId
    }
    localStorage.setItem('habitData',JSON.stringify(data))
    localStorage.removeItem('chainData')
    localStorage.removeItem('boardData');
    localStorage.removeItem('otherData');
    localStorage.removeItem('degreeData');

    this.certificatesList.find(item=>{
      if(JSON.parse(localStorage.getItem('habitData')).certificateType == item.value) {
        this.fess = this.getFees(item.name.en);
        this.nameOfCertificate = item.name.ar
      }
    });
    let studentNames = []
    this.habitStorage = JSON.parse(localStorage.getItem('habitData'))

         this.choosenStudents.forEach(item=>{
          data.Students_Id.forEach(element=>{
            if(element == item.id){
              studentNames.push(item.name.ar)
               this.habitStorage['names'] = studentNames
            }
          })
     })
    this.allCost = this.fess * data.Students_Id.length
    this.chainStorage = []
    this.boardStorage = [] 
    this.otherStorage = {}
    this.degreeStorage = {}
    this.showDegree = false
    this.showBoard = false
    this.showOther = false
    this.showChain = false
    this.display = false
    this.showHabit = true
    this.habitForm.reset()

  }

  sendHabitCertificate(){
    this.getCertificateName();
    this.boardCase = 'habit'
    if(localStorage.getItem('otherData') || localStorage.getItem('chainData') || localStorage.getItem('degreeData') || localStorage.getItem('boardData') || localStorage.getItem('habitData')){    
      this.confirmModelService.openModel({message:this.translate.instant('dashboard.issue of certificate.do you want')+" "+this.certificateName+" "+this.translate.instant('dashboard.issue of certificate.it will remove previous data')})
    }   else if(localStorage.getItem('habitData')){
      this.confirmModelService.openModel({message:this.translate.instant('dashboard.issue of certificate.do you want')+" "+this.certificateName+" "+this.translate.instant('dashboard.issue of certificate.it will remove previous data')})
    }else{
      this.confirmModelService.openModel({message:this.translate.instant('dashboard.issue of certificate.do you want')+" "+this.certificateName})
    }
  }
  
getFees(certificate)
{
 return Number(this.certificatesFeesList.find(c=>c.certificateType==certificate).fees);
}

getCertificateName()
{
  this.certificatesList.forEach(element => {
    if(this.dropId==element.value)
    {
      if(this.lang=='ar')
      {this.certificateName=element.name.ar}
      else 
       {this.certificateName=element.name.en}

    }
  });
}
}
