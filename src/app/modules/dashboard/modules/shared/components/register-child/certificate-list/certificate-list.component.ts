import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { StudentsService } from '../../../../students/services/students/students.service';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss']
})
export class CertificateListComponent implements OnInit {

  studentId = this.route.snapshot.paramMap.get('id')

  filtration :Filter = {...Filtration}
  paginationState= {...paginationInitialState}

  certificates={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }



  constructor(
    private translate: TranslateService,
    private studentService:StudentsService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getCertificate()
  }

  getCertificate(){
    this.certificates.loading=true
    this.certificates.list=[]
    this.studentService.getCertificatesList(this.studentId, this.filtration).subscribe(res =>{
      this.certificates.loading=false
      this.certificates.list = res.data
      this.certificates.totalAllData = res.totalAllData
      this.certificates.total =res.total 
    },err=>{
      this.certificates.loading=false
      this.certificates.total=0
    })
  }


  downloadCertificate(fileUrl : string){
    if (fileUrl) {
      window.open(fileUrl, '_blank').focus();
    } else {
      this.toastrService.warning(this.translate.instant('noURLFound'))
    }
   }


  onSort(e){
    console.log(e);
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.getCertificate()
  }

  clearFilter(){
    this.getCertificate()
  }


  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getCertificate()

  }

}
