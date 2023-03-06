import { Component, inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Dropdown } from 'primeng/dropdown';
import { Subscription } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { IHeader } from 'src/app/core/Models';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { CertificateStatusEnum } from 'src/app/shared/enums/certficates/certificate-status.enum';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SystemRequestService } from '../dashboard/modules/request-list/services/system-request.service';
import { StudentsService } from '../dashboard/modules/students/services/students/students.service';
import { AddStudentCertificateComponent } from './components/academic-sequence/add-student-certificate/add-student-certificate.component';
import { IssuanceCertificaeService } from './services/issuance-certificae.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-issue-certificate',
  templateUrl: './issue-certificate.component.html',
  styleUrls: ['./issue-certificate.component.scss']
})
export class IssueCertificateComponent implements OnInit {

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


  showChain:boolean = false
  dataArray = []
  reasonArr = [];
  certificateName;
  display2
  step = 1;

  headerModal;
  display: boolean = false;
  dropValue;

  nameOfCertificate;
  nameOfStudent;


 faAngleDown = faAngleDown
 subscription:Subscription;
 studentList =inject(StudentsService).getAllStudents();
 get certificateType() { return CertificatesEnum }
 get certificateStatus() { return CertificateStatusEnum }
 isBtnLoading:boolean=false;
 certificateStatusList;
 selectedCertificate;
 filtration = {...Filtration,StudentId: '',CertificateStatus:'',SchoolYearId:'',CertificateType:''};

  childList = []
  boardObj = {}

  degreeForm = this.fb.group({ yearId: '', certificateType: ''});
  dropForm = this.fb.group({ controlVal :''})

  destination=""

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
  studentId = +this.route.snapshot.paramMap.get('studentId')
  paymentRef = this.route.snapshot.queryParamMap.get('TP_RefNo')


  constructor(
    private location: Location,
    private headerService: HeaderService,
    private translate: TranslateService,
    private issuance: IssuanceCertificaeService,
    private fb: FormBuilder,
    public confirmModelService: ConfirmModelService,
    private toastr:ToastrService,
    private userService:UserService,
    private sharedService:SharedService,
    private route:ActivatedRoute,
    private router:Router,
    private requestsService:SystemRequestService,

  ) { 
  }



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
      
    }else this.goToFirst();
    
    // this.allCertificates=this.issuance.allCertificates;
    
   this.getSchoolYearsList();
    this.certificateStatusList=this.issuance.certificateStatusList;
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
        type: certificate.certificateType,
        url: certificate.url
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
    if(this.studentId){
      this.choosenStudents=[];
      this.issuance.getParentsChild(this.guardian.id)
      .subscribe(res => {
        this.choosenStudents.push(res.students.find(s=>s.id==this.studentId))
      })
      this.onStepChanged();
    }
    else{
      this.step=2;
      this.getparentsChildren(this.guardian.id)
    }
  }

  // addAttachment() {
  //   this.attachments.push(this.newCertificate());
  // }




  goToFirst(){
  
    this.step=1;
    localStorage.removeItem('currentCertificate')
    this.selectedCertificate=null;
    this.choosenStudents=[];
    this.getAllCertificates();
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
  
  
  //save other certificate
  onOtherCertificatesSubmitted(){
    this.isBtnLoading=true;
    let data = {
      "studentIds" : this.choosenStudents.map(er=>er.id),
      "certificateType": this.selectedCertificate.value,
      "destination":this.destination || ''
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


  onStepChanged() {    
    // debugger
    console.log(this.selectedCertificate.value)
  
  //  this.selectedCertificate.value=localStorage.getItem('currentCertificate')

    if ( this.selectedCertificate.value == CertificatesEnum.AcademicSequenceCertificate) this.step=3 

    if ( this.selectedCertificate.value == CertificatesEnum.BoardCertificate) this.step=4

    if ( this.selectedCertificate.value == CertificatesEnum.GradesCertificate) this.step=5 

    let arr=[CertificatesEnum.BoardCertificate, CertificatesEnum.AcademicSequenceCertificate, CertificatesEnum.GradesCertificate, CertificatesEnum.GoodBehaviorCertificate,'']

    if (!arr.includes(this.selectedCertificate.value))  this.onOtherCertificatesSubmitted()

    if(this.selectedCertificate.value == CertificatesEnum.GoodBehaviorCertificate) this.display = true;
    
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







  goToPayment(){
    var obj={
      "guardianId":this.guardian.id,
      "commonCertificateRequestIds":this.certificatesIds
    }
 
   this.issuance.payCertificates(obj).subscribe((res)=>{
     if(res.statusCode=="OK") window.location.href=res.result
 
      else{
          if(res?.errorLocalized) this.toastr.error( res?.errorLocalized[this.lang])
          else this.toastr.error(this.translate.instant('error happened'))
      }
   }, err=>{
      this.toastr.error(this.translate.instant('error happened'));
   })
  }



  
getFees(certificate) { return Number(this.certificatesFeesList.find(c=>c.certificateType==certificate).fees) }


getSchoolYearsList(){ this.sharedService.getSchoolYearsList().subscribe((res)=>{ this.schoolYearsList = res })}

goBack() { this.location.back()}

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.StudentId= null;
    this.filtration.SchoolYearId= null;
    this.filtration.CertificateType= null;
    this.filtration.CertificateStatus= null;
    this.filtration.Page=1;
    this.getAllCertificates();
  }

}
