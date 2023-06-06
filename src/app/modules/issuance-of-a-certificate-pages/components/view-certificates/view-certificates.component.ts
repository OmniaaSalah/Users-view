import { Component, OnInit ,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/classes/filtration';
import { IssuanceCertificaeService } from '../../services/issuance-certificae.service';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { CertificateStatusEnum } from 'src/app/shared/enums/certficates/certificate-status.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-certificates',
  templateUrl: './view-certificates.component.html',
  styleUrls: ['./view-certificates.component.scss']
})
export class ViewCertificatesComponent implements OnInit {
  lang =inject(TranslationService).lang;
  certificatesList$= this.issuance.getCetificatesTypes();
  certificateStatusList;
  schoolYearsList;
  studentList ;
  get certificateType() { return CertificatesEnum }
  get certificateStatus() { return CertificateStatusEnum }
  paymentRef = this.route.snapshot.queryParamMap.get('TP_RefNo')
  receiptNo= this.route.snapshot.queryParamMap.get('TP_ReceiptNo')
  certificatesIds=[];
  guardian={id:'',name:{}}
  allCertificates={
    totalAllData:0,
      total:0,
      list:[],
      loading:true
    }
    filtration = {...Filtration,StudentId: null,CertificateStatus:null,SchoolYearId:null,CertificateType:null};
  constructor(  private translate: TranslateService,
    private issuance: IssuanceCertificaeService,
    private toastr:ToastrService,
    private route:ActivatedRoute,
    private router:Router,
    private sharedService:SharedService,
    private userService:UserService,) { }

  ngOnInit(): void {
    this.getAllCertificates();
    if(this.paymentRef)  {
      this.completePaymentProccess()
      localStorage.setItem('url',this.paymentRef)
    }

    this.userService.currentGuardian.subscribe((res)=> {this.guardian=res;});
    this.certificateStatusList=this.issuance.certificateStatusList;
    this.getSchoolYearsList();
    this.issuance.getParentsChild(this.guardian.id).subscribe((res)=>{this.studentList=[...res.students, ...res.studentsWithdrawal]})
  }


  getAllCertificates()
  {
    this.allCertificates.loading = true
    this.allCertificates.list = []
    this.issuance.getAllCertificateOfGurdian(this.filtration).subscribe(res => {
      this.sharedService.filterLoading.next(false);
      this.allCertificates.loading = false
      this.allCertificates.list = res.data
      this.allCertificates.totalAllData = res.totalAllData
      this.allCertificates.total = res.total
    }, err => {
      this.allCertificates.loading = false
      this.allCertificates.total = 0
      this.sharedService.filterLoading.next(false);
    })


  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.StudentId= null;
    this.filtration.SchoolYearId= null;
    this.filtration.CertificateType= null;
    this.filtration.CertificateStatus= null;
    this.filtration.Page=1;
    this.getAllCertificates();
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getAllCertificates();
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
    let obj={
      "guardianId":this.guardian.id,
      "commonCertificateRequestIds":this.certificatesIds
    }

   this.issuance.payCertificates(obj).subscribe((res)=>{
     if(res.statusCode=="OK") window.location.href=res.result

      else{
          if(res?.errorLocalized) this.toastr.error( res?.errorLocalized[this.lang])
          else this.toastr.error(this.translate.instant('toasterMessage.error'))
      }
   }, err=>{
      this.toastr.error(this.translate.instant('toasterMessage.error'));
   })
  }
  completePaymentProccess(){

    this.issuance.completepaymentProcess(this.paymentRef.toString(),this.receiptNo.toString()).subscribe(()=>{
      this.getAllCertificates()
      this.router.navigate([])
    })
  }
  getSchoolYearsList(){
    this.sharedService.getSchoolYearsList().subscribe((res)=>{ this.schoolYearsList = res })
  }
  viewCertificate(certificate){
    window.open(`${environment.clientUrl}/certificate/${certificate?.paymentRefNo||certificate?.id}`)
   }
}
