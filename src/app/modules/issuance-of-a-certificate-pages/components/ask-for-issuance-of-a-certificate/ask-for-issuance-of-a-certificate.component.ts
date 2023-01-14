import { SelectItem } from 'primeng/api';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren,inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
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
import { CurrentLangPipe } from 'src/app/shared/pipes/current-lang/current-lang.pipe';
import { ToastrService } from 'ngx-toastr';
import { ignoreElements, Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';

@Component({
  selector: 'app-ask-for-issuance-of-a-certificate',
  templateUrl: './ask-for-issuance-of-a-certificate.component.html',
  styleUrls: ['./ask-for-issuance-of-a-certificate.component.scss'],
})
export class AskForIssuanceOfACertificateComponent implements OnInit {
  certificatesIds;
  guardian={id:'',name:{}}
  @ViewChildren(AddStudentCertificateComponent) studentsCertificates: QueryList<AddStudentCertificateComponent>
  choosenStudents = []
  schoolYearsList;
  lang =inject(TranslationService).lang;
  currentLang = localStorage.getItem('preferredLanguage')
  skeletonShown = true
  // cloneArray=[]
  @ViewChild('dropDownThing')dropDownThing: Dropdown;
  @ViewChild('dropdown')dropdown: Dropdown;
  degreescertificates;
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
  step = 1;
  // step = true;
  // step1 = false;
  // step2 = false;
  // step3 = false; 
  // step4 = false;
  headerModal;
  display: boolean = false;
  dropValue;
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
 certificate;
 subscription:Subscription;
 allCertificates
 get certificateType() { return CertificatesEnum }
 isBtnLoading:boolean=false;


  childList = []
  boardObj = {}
  degreeForm: FormGroup
  boardForm: FormGroup
  habitForm: FormGroup
  dropForm: FormGroup
  boardReasons =[]
  choosenAttachment = []
  certificatesList ;
  certificatesFeesList;
  componentHeaderData: IHeader = {
    breadCrump: [
      {
        label: this.translate.instant(
          'breadcrumb.Request to issue a certificate'
        ),
        routerLink: '/certificates/ask-certificate',
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
    private index:IndexesService,
    private toastr:ToastrService,
    private userService:UserService,
    private sharedService:SharedService
  ) { }
  boardData = []


  ngOnInit(): void {
    this. getAllCertificates();
    // this.allCertificates=this.issuance.allCertificates;
    this.goToFirst();
   this.getSchoolYearsList();
    this.degreescertificates=this.issuance.degreescertificates;
    this.issuance.getCeritificateFeesList().subscribe((res)=>{this.certificatesFeesList=res});
    this.certificatesList=this.issuance.certificatesList;
    this.headerService.changeHeaderdata(this.componentHeaderData);
  
    this.degreeForm = this.fb.group({
      YEAR_Id: '',
      certificateType: ''
    });

    this.boardForm = this.fb.group({
      reason: this.fb.array(['']),
    });

    this.habitForm = this.fb.group({
      destination:['',Validators.required]
    })

    this.dropForm = this.fb.group({
      controlVal :''
    })
  }

  getAllCertificates()
  {
    this.issuance.getAllCertificateOfGurdian().subscribe((res)=>{
      console.log(res)
      this.allCertificates=res.data
    })
  }
  showChildreens()
  {
    this.step=2;
    this.userService.currentGuardian.subscribe((res)=>
      {
          this.guardian=JSON.parse(res);
          this.getparentsChildren(this.guardian.id)
        
      });
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

goToFirst(){
  this.step=1;
  localStorage.removeItem('currentCertificate')
  this.certificate=null;
}
  getReasonBoard(){

    this.index.getIndext(IndexesEnum.ReasonsForIssuingBoardCertificate).subscribe(res=>{this.boardReasons = res;})
  }


  getparentsChildren(id) {
    this.issuance.getParentsChild(id).subscribe(res => {
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
   console.log(this.boardData)
    this.boardData[i].reasonId = reason

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



//save board certificate
  boardFunc(){   
    this.isBtnLoading=true;
    var data={"studentBoardCertificateDtos":this.boardData}
    console.log(this.boardData)
 
      this.issuance.postBoardCertificate(data).subscribe(result=>{
        this.isBtnLoading=false;
        if(result.statusCode != 'BadRequest'){
        this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
        this.goToFirst();
        }else{
        this.toastr.error(this.translate.instant('error happened'));
        this.showChildreens();
        }
      },err=>{
        this.isBtnLoading=false;
        this.toastr.error(this.translate.instant('error happened'))
      })

  }

  //save Academic certificate
  chainFunc(){
    this.isBtnLoading=true;
    let academicData =[]
    let data;
    this.studentsCertificates.forEach(x => {
      academicData.push(x.stdForm.value)
    }) 

    academicData=academicData.map(item=>{return{
      "studentId": item.id,
      "certificatedType": this.certificate.value,
      "certificates":item.certificates
    }});
    
     data={"studentEducationCertificates":academicData}

    this.issuance.postSequenceCertificate(data).subscribe(result=>{
      this.isBtnLoading=false;
      if(result.statusCode != 'BadRequest'){
      this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
      this.goToFirst();
      }else{
      this.toastr.error(this.translate.instant('error happened'))
      this.showChildreens();
      }
    },err=>{
      this.isBtnLoading=false;
      this.toastr.error(this.translate.instant('error happened'))
    })

  }




//save degree certificate
  degreeFunc(){
    this.isBtnLoading=true;
    let studentsId = []
    this.choosenStudents.forEach(res => {
      studentsId.push(res.id)
    })

    
    let data = {
      "studentIds": studentsId,
      "certificateType": this.dropValue, 
      "yearId": this.degreeForm.value.YEAR_Id,
      "gradeCertificateType": this.valueOfEnum
    }
    console.log(data);
    
    this.issuance.postGradeCertificate(data).subscribe(result=>{
      this.isBtnLoading=false;
      if(result.statusCode != 'BadRequest'){
      this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
      this.goToFirst();
      }else{
      this.toastr.error(this.translate.instant('error happened'));
      this.showChildreens();
      }
    },err=>{
      this.isBtnLoading=false;
      this.toastr.error(this.translate.instant('error happened'))
    })
    

  }
  //save habit certificate
  habitFunc(){
    this.isBtnLoading=true;
    let data = {
      "destination": this.habitForm.value.destination,
      "studentIds" : this.choosenStudents.map(er=>er.id),
      "certificateType": this.dropValue
    }
  console.log(data)
   
 

    this.issuance.postOtherCertificate(data).subscribe(result=>{
      this.isBtnLoading=false;
      this.display = false
      if(result.statusCode != 'BadRequest'){
      this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
      this.goToFirst();
      }else{
      this.toastr.error(this.translate.instant('error happened'));
      this.showChildreens();
      }
    },err=>{
      this.isBtnLoading=false;
      this.display = false
      this.toastr.error(this.translate.instant('error happened'))
    })

  }

  //save other certificate
  otherFunc(){
    this.isBtnLoading=true;
    let data = {
      "studentIds" : this.choosenStudents.map(er=>er.id),
      "certificateType": this.dropValue,
      "destination":null
    }
    console.log(data)
      this.issuance.postOtherCertificate(data).subscribe(result=>{
      this.isBtnLoading=false;
      if(result.statusCode != 'BadRequest'){
      this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
      this.goToFirst();
      }else{
      this.toastr.error(this.translate.instant('error happened'));
      this.showChildreens();
      }
    },err=>{
      this.isBtnLoading=false;
      this.toastr.error(this.translate.instant('error happened'))
    })

  }

  checkDropValue() {

    this.dropValue =this.certificate.value;
    this.certificateName=this.certificate.name
    localStorage.setItem('currentCertificate',this.dropValue)
  }


  changeRoute2() {    
  
   this.dropValue=localStorage.getItem('currentCertificate')
    if ( this.dropValue == CertificatesEnum.AcademicSequenceCertificate) { 
     
      this.step=3 
    
    }
    if ( this.dropValue == CertificatesEnum.BoardCertificate) { 
      this.getBoards()
      this.getReasonBoard()

      this.boardData = this.choosenStudents.map(element=>{      
        let container = {
          studentId: element.id,
          certificatedType: this.dropValue,
          reasonId: '',
          attachments: []
         };
       
         
          return container    
       })

   
      this.step=4 
    }
    if ( this.dropValue == CertificatesEnum.GradesCertificate) { 
   
   
      this.step=5 
    }
    if ( this.dropValue !==CertificatesEnum.BoardCertificate &&  this.dropValue !== CertificatesEnum.AcademicSequenceCertificate &&  this.dropValue !== CertificatesEnum.GradesCertificate&&  this.dropValue !== "" &&  this.dropValue !== CertificatesEnum.GoodBehaviorCertificate) {
     
      this.otherFunc()
    }
    if(this.dropValue == CertificatesEnum.GoodBehaviorCertificate){
     
      this.showDialog()
    
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
        data['studentIds'].forEach((element,index) => {
          if(element == student){
            data['studentIds'].splice(index,1)

            this.otherStorage.studentIds.splice(index,1)
            this.otherStorage.names.splice(index,1) 
            this.allCost = this.fess * this.otherStorage.names.length
            localStorage.setItem('otherData',JSON.stringify(data))
            if(data['studentIds'].length==0) localStorage.removeItem('otherData')
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







  payFunc(){
    // debugger
  
    this.confirmModelService.openModel({message:'طليك قيد الانتظار هل تريد استكمال الدفع ؟'});

  }



  
getFees(certificate)
{

 return Number(this.certificatesFeesList.find(c=>c.certificateType==certificate).fees);
}

getSchoolYearsList(){
  this.sharedService.getSchoolYearsList().subscribe((res)=>{ this.schoolYearsList = res })
 }


}
