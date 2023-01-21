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
import { CertificateStatusEnum } from 'src/app/shared/enums/certficates/certificate-status.enum';
import { Filtration } from 'src/app/core/classes/filtration';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';

@Component({
  selector: 'app-ask-for-issuance-of-a-certificate',
  templateUrl: './ask-for-issuance-of-a-certificate.component.html',
  styleUrls: ['./ask-for-issuance-of-a-certificate.component.scss'],
})
export class AskForIssuanceOfACertificateComponent implements OnInit {
  certificatesIds=[];
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
 filtration: Filter = { ...Filtration  }
 get certificateType() { return CertificatesEnum }
 get certificateStatus() { return CertificateStatusEnum }
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
  allCertificates={
    totalAllData:0,
      total:0,
      list:[],
      loading:true
    }
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
    console.log(this.choosenStudents)
    
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
    this.allCertificates.loading = true
    this.allCertificates.list = []
    this.issuance.getAllCertificateOfGurdian(this.filtration).subscribe(res => {

      this.allCertificates.loading = false
      this.allCertificates.list = res.data
      this.allCertificates.totalAllData = res.totalAllData
      this.allCertificates.total = res.total
    }, err => {
      this.allCertificates.loading = false
      this.allCertificates.total = 0
    })

   
  }
  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getAllCertificates();
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
  this.choosenStudents=[];
  this. getAllCertificates();
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
  
    this.boardData[i].reasonId = reason

    this.reasonArr.push(reason)
   
    if(this.choosenStudents.length == this.reasonArr.length) this.saveBtn = true
    
  }

  onAttachmentSelected(attachmentId,index){
    
    
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
      "destination":""
    }
   
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

  removeRequest(id){
if(id)
  {
    this.issuance.deleteCertificate(id).subscribe((res)=>{
    this.toastr.success(this.translate.instant('deleted Successfully'));
    this. getAllCertificates();
  },(err)=>{
    this.toastr.error(this.translate.instant("Request cannot be processed, Please contact support."));
  })
  }

  }







  payFunc(){
  console.log(this.certificatesIds)

  }



  
getFees(certificate)
{

 return Number(this.certificatesFeesList.find(c=>c.certificateType==certificate).fees);
}

getSchoolYearsList(){
  this.sharedService.getSchoolYearsList().subscribe((res)=>{ this.schoolYearsList = res })
 }


}
