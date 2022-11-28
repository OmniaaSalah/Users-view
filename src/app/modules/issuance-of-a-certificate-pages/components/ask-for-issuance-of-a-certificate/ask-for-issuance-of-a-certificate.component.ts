import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Dropdown } from 'primeng/dropdown';
import { IHeader } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
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
  // cloneArray=[]
  @ViewChild('dropDownThing')dropDownThing: Dropdown;
  @ViewChild('dropdown')dropdown: Dropdown;
  attachmentsNumbers=0
  showDegree:boolean = false
  showOther:boolean = false
  showBoard:boolean = false
  showChain:boolean = false
  showHabit:boolean = false
  dataArray = []
  reasonArr = []
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
  boardArr =[{id: 1,name:'2022'}, {id: 2,name:'2023'}, {id: 3,name:'2024'}]
  choosenAttachment = []
  certificatesList = [
    {
      Id : 1,
    ArabicName : "شهادة البورد",
    EnglishName : "Board Certificate",
    fees : 15
  },
  {
    Id : 2,
    ArabicName : "شهادة التسلسل الدراسي",
    EnglishName : "Academic Sequence Certificate",
    fees : 20
  },
  {
    Id : 3,
    ArabicName : "شهادة الدرجات",
    EnglishName : "Grades Certificate",
    fees : 30
  },
  {
     Id : 4,
    ArabicName : "شهادة الاستمرار في الدراسة",
    EnglishName : "Continuing Education Certificate",
    fees : 25
  },
  {
     Id : 5,
    ArabicName : "شهادة الأنتقال",
    EnglishName : "Transfer Certificate",
    fees : 15
  },
  {
     Id : 6,
    ArabicName : "حسن سيرة والسلوك",
    EnglishName : "Good Behavior Certificate",
    fees : 25
  },
  {
     Id : 7,
    ArabicName : "شهادة الدبلوم",
    EnglishName : "Diploma Certificate",
    fees : 35
  },
  {
     Id : 8,
    ArabicName : "شهادة المواد الداخلية للمدرسة",
    EnglishName : "School Internal Subjects Certificate",
    fees : 35
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
    private issuance: IssuanceCertificaeService,
    private fb: FormBuilder,
    public confirmModelService: ConfirmModelService
  ) { }
  boardData = []


  ngOnInit(): void {
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
        if(element.certificateType == item.Id) {
          this.fess = item.fees
          this.nameOfCertificate = item.ArabicName
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
    this.boardCase = 'board'
    if(localStorage.getItem('otherData') || localStorage.getItem('chainData') || localStorage.getItem('degreeData') || localStorage.getItem('habitData') || localStorage.getItem('boardData')){
      this.confirmModelService.openModel(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    }   else if(localStorage.getItem('boardData')){
      this.confirmModelService.openModel(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    }else{
      this.confirmModelService.openModel("هل تريد اصدار " + this.dropValue)
    }
    

    // if(localStorage.getItem('otherData') || localStorage.getItem('chainData') || localStorage.getItem('degreeData') || localStorage.getItem('habitData') || localStorage.getItem('boardData')){
    //   this.confirmModelService.openModel();
    //   this.confirmModelService.message$.next(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    //   this.confirmModelService.confirmed$.next(null)
    //   this.confirmModelService.confirmed$.subscribe(val=>{
    //     if(val){
    //      this.boardFunc()
    //         // console.log(this.boardData)
    //     }
    //   })
    // } 
    // else if(localStorage.getItem('boardData')){
    //   this.confirmModelService.openModel();
    //   this.confirmModelService.message$.next(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    //   this.confirmModelService.confirmed$.next(null)
    //   this.confirmModelService.confirmed$.subscribe(val=>{
    //     if(val){
    //       this.boardFunc()
    //     }
    //   })
    // }
    // else{
    //   this.confirmModelService.openModel();
    //   this.confirmModelService.message$.next("هل تريد اصدار " + this.dropValue)
    //   this.confirmModelService.confirmed$.next(null)
    //   this.confirmModelService.confirmed$.subscribe(val=>{
    //     if(val){
    //       this.boardFunc()
    //     }
    //   })
    // }
  }



  checkDropValue(eventValue) {
    this.dropId = eventValue.value
    this.dropValue = eventValue.originalEvent.target.innerText
  }

  changeRoute() {
    this.step = false
    this.step1 = true
  }
  changeRoute2() {    
    // debugger
    // الشغل كله هنا 
    if (this.dropValue == "شهادة التسلسل الدراسي") { // شهاده تسلسلي
      console.log(this.dropValue);
      this.step = false
      this.step1 = false
      this.step2 = true
      this.step3 = false
      this.step4 = false
    }
    if (this.dropValue == "شهادة البورد") { // شهاده البورد
      this.getBoards()


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
      console.log(this.dropValue)
      this.step = false
      this.step1 = false
      this.step2 = false
      this.step3 = true
      this.step4 = false
    }
    if (this.dropValue == "شهادة الدرجات") { // شهاده الدرجات
      console.log(this.dropValue)
      this.step = false
      this.step1 = false
      this.step2 = false
      this.step3 = false
      this.step4 = true
    }
    if (this.dropValue !== "شهادة البورد" && this.dropValue !== "شهادة التسلسل الدراسي" && this.dropValue !== "شهادة الدرجات"&& this.dropValue !== "" && this.dropValue !== "حسن سيرة والسلوك") {
      // this.showDialog()
          this.sendOtherCertificates();
    }
    if(this.dropValue == "حسن سيرة والسلوك"){
      console.log('here');
      
      this.sendHabitCertificate()
    }
    

  }
  confirmVal
  showDialog() {
    console.log("dia");
    
    this.display = true;
    this.headerModal = "اسم الجهة المراد اصدار الشهادة لها";
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
        if(element.certificateType == item.Id) {
          this.fess = item.fees
          this.nameOfCertificate = item.ArabicName
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
 

    // this.dropValue = ''

    // console.log(data);
  }


  postData() {
    this.boardCase = 'chain'
    if(localStorage.getItem('otherData') || localStorage.getItem('chainData') || localStorage.getItem('degreeData') || localStorage.getItem('boardData') || localStorage.getItem('habitData')){
      this.confirmModelService.openModel(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    }   else if(localStorage.getItem('chainData')){
      this.confirmModelService.openModel(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    }else{
      this.confirmModelService.openModel("هل تريد اصدار " + this.dropValue)
    }

    // if(localStorage.getItem('otherData') || localStorage.getItem('chainData') || localStorage.getItem('degreeData') || localStorage.getItem('boardData') || localStorage.getItem('habitData')){
    //   this.confirmModelService.openModel();
    //   this.confirmModelService.message$.next(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    //   this.confirmModelService.confirmed$.next(null)
    //   this.confirmModelService.confirmed$.subscribe(result=>{
    //     // debugger
    //     if(result){
    //         this.chainFunc()
    //     }
    //   })
    // } 
    // else if(localStorage.getItem('chainData')){
    //   this.confirmModelService.openModel();
    //   this.confirmModelService.message$.next(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    //   this.confirmModelService.confirmed$.next(null)
    //   this.confirmModelService.confirmed$.subscribe(result=>{
    //     // debugger
    //     if(result){
    //       this.chainFunc()
    //     }
    //   })
    // }
    // else{
    //   console.log(this.dropValue);
    //   this.confirmModelService.openModel();
    //   this.confirmModelService.message$.next("هل تريد اصدار " + this.dropValue)
    //   this.confirmModelService.confirmed$.next(null)
    //   this.confirmModelService.confirmed$.subscribe(val=>{
    //     this.confirmVal = val
    //     if(this.confirmVal) {
    //       this.chainFunc()
    //     }
    // }) 
    // }      
    
  }


  degreeFunc(){
    
    let studentsId = []
    this.choosenStudents.forEach(res => {
      studentsId.push(res.id)
    })

    
    let data = {
      "Students_Id": studentsId,
      "certificateType": this.dropId, // error/undefined////////////////////////////////////////////
      "Year_Id": this.degreeForm.value.YEAR_Id,
      "certificateGradeType": this.degreeForm.value.certificateType
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
        if(JSON.parse(localStorage.getItem('degreeData')).certificateType == item.Id) {
          this.fess = item.fees
          this.nameOfCertificate = item.ArabicName
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
   

      // this.dropValue = ''
      // this.otherStorage = {}
    // console.log(data);

  }
  

  sendDegreeForm() {  
    this.boardCase = 'degree'
    if(localStorage.getItem('otherData') || localStorage.getItem('chainData') || localStorage.getItem('degreeData') || localStorage.getItem('boardData') || localStorage.getItem('habitData')){      this.confirmModelService.openModel(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    }   else if(localStorage.getItem('degreeData')){
      this.confirmModelService.openModel(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    }else{
      this.confirmModelService.openModel("هل تريد اصدار " + this.dropValue)
    }
    // if(localStorage.getItem('otherData') || localStorage.getItem('chainData') || localStorage.getItem('degreeData') || localStorage.getItem('boardData') || localStorage.getItem('habitData')){
    //   this.confirmModelService.openModel();
    //   this.confirmModelService.message$.next(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    //   this.confirmModelService.confirmed$.next(null)
    //   this.confirmModelService.confirmed$.subscribe(result=>{
    //     // debugger
    //     if(result){
    //         this.degreeFunc()
    //     }
    //   })
    // } 
    // else if(localStorage.getItem('degreeData')){
    //   this.confirmModelService.openModel();
    //   this.confirmModelService.message$.next(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    //   this.confirmModelService.confirmed$.next(null)
    //   this.confirmModelService.confirmed$.subscribe(result=>{
    //     // debugger
    //     if(result){
    //       this.degreeFunc()
    //     }
    //   })
    // }
    // else{
    //   console.log(this.dropValue);
    //   this.confirmModelService.openModel();
    //   this.confirmModelService.message$.next("هل تريد اصدار " + this.dropValue)
    //   this.confirmModelService.confirmed$.next(null)
    //   this.confirmModelService.confirmed$.subscribe(val=>{
    //     this.confirmVal = val
    //     if(this.confirmVal) {
    //       this.degreeFunc()
    //     }
    // }) 
    // }      
   
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
        if(JSON.parse(localStorage.getItem('otherData')).certificateType == item.Id) {
          this.fess = item.fees
          this.nameOfCertificate = item.ArabicName
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
    

      // this.dropValue = ''
  }

  confirmModelListener(){
    this.confirmModelService.confirmed$.subscribe(result=>{
      // debugger 
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
              window.location.href = 'https://www.google.com/'
              localStorage.removeItem('otherData')
              localStorage.removeItem('chainData')
              localStorage.removeItem('degreeData')
              localStorage.removeItem('boardData')
              localStorage.removeItem('habitData')
            } else{
              return
            }
              
           
          }
      }
    })
  }

  sendOtherCertificates(){    
    // debugger
    this.boardCase = 'other'
    if(localStorage.getItem('otherData') || localStorage.getItem('chainData') || localStorage.getItem('degreeData') || localStorage.getItem('boardData') || localStorage.getItem('habitData')){
      this.confirmModelService.openModel(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    }   else if(localStorage.getItem('otherData')){
      this.confirmModelService.openModel(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    }else{
      this.confirmModelService.openModel("هل تريد اصدار " + this.dropValue)
    }
    

    



    // if(localStorage.getItem('otherData') || localStorage.getItem('chainData') || localStorage.getItem('degreeData') || localStorage.getItem('boardData') || localStorage.getItem('habitData')){
    //   this.confirmModelService.openModel();
    //   this.confirmModelService.message$.next(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    //   this.confirmModelService.confirmed$.next(null)

    // } 
    // else if(localStorage.getItem('otherData')){
    //   this.confirmModelService.openModel();
    //   this.confirmModelService.message$.next(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    //   this.confirmModelService.confirmed$.next(null)
    //   this.confirmModelService.confirmed$.subscribe(result=>{
    //     // debugger
    //     if(result){
    //          this.otherFunc()
    //     }
    //   })
    // }
    // else{
    //   console.log(this.dropValue);
    //   this.confirmModelService.openModel();
    //   this.confirmModelService.message$.next("هل تريد اصدار " + this.dropValue)
    //   this.confirmModelService.confirmed$.next(null)
    //   this.confirmModelService.confirmed$.subscribe(val=>{
    //     this.confirmVal = val
    //     if(this.confirmVal) {
    //     this.otherFunc()
    //   }
    // }) 
    // }      
    }


  payFunc(){
    // debugger
    this.boardCase = 'pay'
    this.confirmModelService.openModel('طليك قيد الانتظار هل تريد استكمال الدفع ؟');
      // this.confirmModelService.confirmed$.subscribe(result=>{
      //   // debugger
      //   if(result){

        // window.location.href = 'https://www.google.com/'
        // localStorage.removeItem('otherData')
        // localStorage.removeItem('chainData')
        // localStorage.removeItem('degreeData')
        // localStorage.removeItem('boardData')
        // localStorage.removeItem('habitData')
      //   }
      // })
      
  }

  habitFunc(){
    // debugger
    // this.confirmModelService.isOpend$.next(false)
    // this.display = true;
    // this.headerModal = "اسم الجهة المراد اصدار الشهادة لها";
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
      if(JSON.parse(localStorage.getItem('habitData')).certificateType == item.Id) {
        this.fess = item.fees
        this.nameOfCertificate = item.ArabicName
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
    this.boardCase = 'habit'
    if(localStorage.getItem('otherData') || localStorage.getItem('chainData') || localStorage.getItem('degreeData') || localStorage.getItem('boardData') || localStorage.getItem('habitData')){    
        this.confirmModelService.openModel(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    }   else if(localStorage.getItem('habitData')){
      this.confirmModelService.openModel(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    }else{
      this.confirmModelService.openModel("هل تريد اصدار " + this.dropValue)
    }
    // debugger
    // if(localStorage.getItem('otherData') || localStorage.getItem('chainData') || localStorage.getItem('degreeData') || localStorage.getItem('boardData') || localStorage.getItem('habitData')){
    //   this.confirmModelService.openModel();
    //   this.confirmModelService.message$.next(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    //   this.confirmModelService.confirmed$.next(null)
    //   this.confirmModelService.confirmed$.subscribe(result=>{
    //     // debugger
    //     if(result){
    //         this.showDialog()
    //         // this.habitFunc()
    //     }
    //   })
    // } 
    // else if(localStorage.getItem('habitData')){
    //   this.confirmModelService.openModel();
    //   this.confirmModelService.message$.next(`هل تريد اصدار ${this.dropValue} سوف يتم حذف البيانات السابقة`)
    //   this.confirmModelService.confirmed$.next(null)
    //   this.confirmModelService.confirmed$.subscribe(result=>{
    //     // debugger
    //     if(result){
    //       this.showDialog()

    //         //  this.habitFunc()
    //     }
    //   })
    // }
    // else{
    //   // debugger
    //   console.log(this.dropValue);
    //  this.confirmModelService.message$.next("هل تريد اصدار " + this.dropValue)
    //   this.confirmModelService.openModel();
    //   this.confirmModelService.confirmed$.next(null)
    //   this.confirmModelService.confirmed$.subscribe(val=>{
    //     // debugger
    //     this.confirmVal = val
    //     if(this.confirmVal) {
    //     this.showDialog()
    //     // this.habitFunc()
    //   }
    // }) 
    // }      

  }

}
