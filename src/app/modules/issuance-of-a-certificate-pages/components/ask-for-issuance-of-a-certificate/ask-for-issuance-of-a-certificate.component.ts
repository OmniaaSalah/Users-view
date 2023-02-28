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
import { ActivatedRoute, Router } from '@angular/router';
import { SystemRequestService } from 'src/app/modules/dashboard/modules/request-list/services/system-request.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { HttpClient } from '@angular/common/http';

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

  skeletonShown = true
  // cloneArray=[]
  @ViewChild('dropDownThing')dropDownThing: Dropdown;
  @ViewChild('dropdown')dropdown: Dropdown;

  certificateModelsOpend=true

  degreescertificates = this.issuance.degreescertificates;

  valueOfEnum;
  attachmentsNumbers=0

  showChain:boolean = false
  dataArray = []
  reasonArr = [];
  certificateName;
  saveBtn:boolean = false
  display2
  step = 1;

  headerModal;
  display: boolean = false;
  dropValue;

  nameOfCertificate;
  nameOfStudent;


 faAngleDown = faAngleDown
 subscription:Subscription;
 filtration: Filter = { ...Filtration  }
 get certificateType() { return CertificatesEnum }
 get certificateStatus() { return CertificateStatusEnum }
 isBtnLoading:boolean=false;

 selectedCertificate;


  childList = []
  boardObj = {}

  degreeForm = this.fb.group({ yearId: '', certificateType: ''});
  boardForm = this.fb.group({reason: this.fb.array(['']),});
  habitForm = this.fb.group({ destination:['',Validators.required]})
  dropForm = this.fb.group({ controlVal :''})



  boardReasons =[]
  choosenAttachment = []
  certificatesList$= this.issuance.getCetificatesTypes();
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
          'dashboard.parentHome.Request certificates'
        ),
        routerLink: '/certificates/ask-certificate',
        routerLinkActiveOptions: { exact: true },
      },
    ],
    mainTitle: {
      main: this.translate.instant('dashboard.parentHome.Request certificates'),
    },
  };

  // NOTE :- -------------------------------
  reqInstance = this.route.snapshot.queryParamMap.get('requestInstance')
  returnedReqData = JSON.parse(localStorage.getItem('returnedRequest'))
  actions

  paymentRef = this.route.snapshot.queryParamMap.get('TP_RefNo')

//  url = this.sanitized.bypassSecurityTrustResourceUrl('https://valsquad.blob.core.windows.net/daleel/ebf86f8e-7ce3-45c0-b84d-ae29f19b4ad0.html');
url
  constructor(
    private headerService: HeaderService,
    private translate: TranslateService,
    private issuance: IssuanceCertificaeService,
    private fb: FormBuilder,
    public confirmModelService: ConfirmModelService,
    private index:IndexesService,
    private toastr:ToastrService,
    private userService:UserService,
    private sharedService:SharedService,
    private route:ActivatedRoute,
    private router:Router,
    private requestsService:SystemRequestService,
    private sanitized: DomSanitizer,
    private http:HttpClient
  ) { 

    // fetch('https://valsquad.blob.core.windows.net/daleel/ebf86f8e-7ce3-45c0-b84d-ae29f19b4ad0.html',
    // {
    //   method: 'GET',
    //   headers: {'Content-Type': 'application/octet-stream'}
    // }
    //   )
    //   // .then(res=>{
    //   //   return res.json();
    //   // })
    // .then((res)=>{
    //   console.log(res);
      
    //   // this.url=this.sanitized.bypassSecurityTrustResourceUrl(res)
    //   this.url = res
    // })
    // this.http.get('https://valsquad.blob.core.windows.net/daleel/ebf86f8e-7ce3-45c0-b84d-ae29f19b4ad0.html').subscribe(res=>{
    //   // this.url = res
    // })
  }
  boardData = []


  ngOnInit(): void {

    if(this.paymentRef)  {
      console.log(this.paymentRef)
      this.completePaymentProccess()
      localStorage.setItem('url',this.paymentRef)
    }

    this.userService.currentGuardian.subscribe((res)=> {this.guardian=res;});

    if(this.reqInstance){
      this.getRequestOptions()
      this.step =3
      this.choosenStudents.push(this.returnedReqData[0].student)
      this.selectedCertificate= {
        "value": CertificatesEnum.AcademicSequenceCertificate,
        "name": {
          "en": this.translate.instant("dashboard.issue of certificate.AcademicSequenceCertificate"),
          "ar": this.translate.instant("dashboard.issue of certificate.AcademicSequenceCertificate")
        }
      }
      this.onCertificateSelected()
      
    }else this.goToFirst();
    
    // this.allCertificates=this.issuance.allCertificates;
    
   this.getSchoolYearsList();
    // this.issuance.getCeritificateFeesList().subscribe((res)=>{this.certificatesFeesList=res});
    // this.certificatesList$=this.issuance.getCetificatesTypes();
    this.headerService.changeHeaderdata(this.componentHeaderData);
  
  }


  completePaymentProccess(){
   
    this.issuance.completepaymentProcess(this.paymentRef.toString()).subscribe(()=>{
      this.getAllCertificates()
      this.router.navigate([])
    })
  }

  viewCertificate(certificate){
    this.router.navigate(['certificates/certificate-details'],
    {queryParams:
      {
        type:certificate.certificateType,
        // certificate:certificate.jsonObj,
      }
    })
    localStorage.setItem("certificate",certificate.jsonObj)
    // if (fileUrl) {
    //   window.open(fileUrl, '_blank').focus();
    // } else {
    //   this.toastr.warning(this.translate.instant('noURLFound'))
    // }
   }


  getRequestOptions(){
    this.requestsService.getRequestTimline(this.reqInstance).subscribe(res=>{
      this.actions = res?.task?.options
    })
  }


  getAllCertificates()
  {
    this.allCertificates.loading = true
    this.allCertificates.list = []
    this.issuance.getAllCertificateOfGurdian(this.filtration).subscribe(res => {
      console.log(JSON.parse(res.data[1].jsonObj));
      
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

  showChildreens(){
    this.step=2;
    this.getparentsChildren(this.guardian.id)
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
    this.selectedCertificate=null;
    this.choosenStudents=[];
    this.getAllCertificates();
  }

  getReasonBoard(){

    this.index.getIndext(IndexesEnum.ReasonsForIssuingBoardCertificate).subscribe(res=>{this.boardReasons = res;})
  }


  getparentsChildren(id) {
    this.issuance.getParentsChild(id).subscribe(res => {

      if(this.selectedCertificate.value == CertificatesEnum.TransferCertificate){
        this.childList =[...res.students, ...res.studentsWithdrawal ||[]]
        this.skeletonShown = false
        return;

      }
      else if(this.selectedCertificate.value == CertificatesEnum.DiplomaCertificate){
        this.childList =res.students.filter(el => Number(el.gradeCode) >= 10)
        this.skeletonShown = false
        return;
        
      }

      this.childList = res.students
      this.skeletonShown = false
    })
  }

  
  selectedStudentsChanged(checked, student) {
    
    if (checked) {
      this.choosenStudents.push(student)
    } else {
      this.choosenStudents.forEach((item, index) => {
        if (student.id === item.id) { 
          this.choosenStudents.splice(index, 1)
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
          if(result?.errorLocalized) 
          {this.toastr.error( result?.errorLocalized[this.lang])}
          else
          {this.toastr.error(this.translate.instant('error happened'))}
        this.showChildreens();
        }
      },err=>{
        this.isBtnLoading=false;
        this.toastr.error(this.translate.instant('error happened'))
      })

  }

  //save Academic certificate
  sendAcademiccertificateReq(){
    this.isBtnLoading=true;
    let academicData =[]
    let data;
    this.studentsCertificates.forEach(x => {
      academicData.push(x.stdForm.value)
    }) 

    academicData=academicData.map(item=>{return{
      "studentId": item.id,
      "certificatedType": this.selectedCertificate.value,
      "certificates":item.certificates
    }});
    
     data={"studentEducationCertificates":academicData}

    this.issuance.postSequenceCertificate(data).subscribe(result=>{
      this.isBtnLoading=false;
      if(result.statusCode != 'BadRequest'){
      this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
      this.goToFirst();
      }else{
     if(result?.errorLocalized) 
     {this.toastr.error( result?.errorLocalized[this.lang])}
     else
     {this.toastr.error(this.translate.instant('error happened'))}
      this.showChildreens();
      }
    },err=>{
      this.isBtnLoading=false;
      this.toastr.error(this.translate.instant('error happened'))
    })

  }

  //save Academic certificate
  reSendAcademiccertificateReq(){
    this.isBtnLoading=true;
    let academicData =[]
    let data;
    this.studentsCertificates.forEach(x => {
      academicData.push(x.stdForm.value)
    }) 

    academicData=academicData.map(item=>{return{
      "studentId": item.id,
      "certificatedType": this.selectedCertificate.value,
      "certificates":item.certificates
    }});
    
     data={"studentEducationCertificates":academicData}

    this.issuance.postSequenceCertificate(data).subscribe(result=>{
      this.isBtnLoading=false;
      if(result.statusCode != 'BadRequest'){
      this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
      this.goToFirst();
      }else{
     if(result?.errorLocalized) 
     {this.toastr.error( result?.errorLocalized[this.lang])}
     else
     {this.toastr.error(this.translate.instant('error happened'))}
      this.showChildreens();
      }
    },err=>{
      this.isBtnLoading=false;
      this.toastr.error(this.translate.instant('error happened'))
    })

  }






//save degree certificate
  submitDegreeCertificate(){
    this.isBtnLoading=true;
    let studentsId = []
    this.choosenStudents.forEach(res => {
      studentsId.push(res.id)
    })

    let data = {
      ...this.degreeForm.value,
      "studentIds": studentsId,
      "certificateType": this.selectedCertificate.value, 
    }
   
    
    this.issuance.postGradeCertificate(data).subscribe(result=>{
      this.isBtnLoading=false;
      if(result.statusCode != 'BadRequest'){
      this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
      this.goToFirst();
      }else{
        if(result?.errorLocalized) 
        {this.toastr.error( result?.errorLocalized[this.lang])}
        else
        {this.toastr.error(this.translate.instant('error happened'))}
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
      "certificateType": this.selectedCertificate.value
    }
  
   
 

    this.issuance.postOtherCertificate(data).subscribe(result=>{
      this.isBtnLoading=false;
      this.display = false
      if(result.statusCode != 'BadRequest'){
      this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
      this.goToFirst();
      }else{
        if(result?.errorLocalized) 
        {this.toastr.error( result?.errorLocalized[this.lang])}
        else
        {this.toastr.error(this.translate.instant('error happened'))}
      this.showChildreens();
      }
    },err=>{
      this.isBtnLoading=false;
      this.display = false
      this.toastr.error(this.translate.instant('error happened'))
    })

  }

  //save other certificate
  onOtherCertificatesSubmitted(){
    this.isBtnLoading=true;
    let data = {
      "studentIds" : this.choosenStudents.map(er=>er.id),
      "certificateType": this.selectedCertificate.value,
      "destination":""
    }
   
      this.issuance.postOtherCertificate(data).subscribe(result=>{
      this.isBtnLoading=false;
      if(result.statusCode != 'BadRequest'){
      this.toastr.success(this.translate.instant('dashboard.issue of certificate.success message'));
      this.goToFirst();
      }else{
        if(result?.errorLocalized) 
        {this.toastr.error( result?.errorLocalized[this.lang])}
        else
        {this.toastr.error(this.translate.instant('error happened'))}
      this.showChildreens();
      }
    },err=>{
      this.isBtnLoading=false;
      this.toastr.error(this.translate.instant('error happened'))
    })

  }

  onCertificateSelected() {

    // this.selectedCertificate.value =this.selectedCertificate.value;

    // this.certificateName=this.selectedCertificate.name

    // localStorage.setItem('currentCertificate',this.selectedCertificate.value)
  }


  changeRoute2() {    
  
  //  this.selectedCertificate.value=localStorage.getItem('currentCertificate')

    if ( this.selectedCertificate.value == CertificatesEnum.AcademicSequenceCertificate) this.step=3 

    if ( this.selectedCertificate.value == CertificatesEnum.BoardCertificate) { 
      this.getBoards()
      this.getReasonBoard()

      this.boardData = this.choosenStudents.map(element=>{      
        let container = {
          studentId: element.id,
          certificatedType: this.selectedCertificate.value,
          reasonId: '',
          attachments: []
         };
       
          return container    
       })

      this.step=4 
    }

    if ( this.selectedCertificate.value == CertificatesEnum.GradesCertificate) this.step=5 

    let arr=[CertificatesEnum.BoardCertificate,CertificatesEnum.AcademicSequenceCertificate,CertificatesEnum.GradesCertificate,CertificatesEnum.GoodBehaviorCertificate,'']
    if (!arr.includes(this.selectedCertificate.value))  this.onOtherCertificatesSubmitted()

    if(this.selectedCertificate.value == CertificatesEnum.GoodBehaviorCertificate) this.display = true;
    
  }


  // showDialog() {
    // this.display = true;
    // this.headerModal = this.translate.instant('dashboard.issue of certificate.The name of the entity to which the certificate is to be issued');
    // this.habitStorage = {}
    // this.showHabit = false
    // this.otherStorage = {}
    // this.showOther = false
    // this.degreeStorage = {}
    // this.showDegree = false
    // localStorage.removeItem('degreeData')
    // localStorage.removeItem('otherData')
  // }

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







  goToPayment(){
    var obj={
      "guardianId":this.guardian.id,
      "commonCertificateRequestIds":this.certificatesIds
    }
 
   this.issuance.payCertificates(obj).subscribe((res)=>{
 console.log(res)
     if(res.statusCode=="OK")
     { 
      window.location.href=res.result
    }
     else
     {
      if(res?.errorLocalized) 
        {this.toastr.error( res?.errorLocalized[this.lang])}
        else
        {this.toastr.error(this.translate.instant('error happened'))}
     }
   },
   (err)=>{
    this.toastr.error(this.translate.instant('error happened'));
   })
  }



  
getFees(certificate)
{

 return Number(this.certificatesFeesList.find(c=>c.certificateType==certificate).fees);
}

getSchoolYearsList(){
  this.sharedService.getSchoolYearsList().subscribe((res)=>{ this.schoolYearsList = res })
 }


}
