import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { environment } from 'src/environments/environment';
import { StudentsService } from '../../../../students/services/students/students.service';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss']
})
export class CertificateListComponent implements OnInit {

  studentId = this.route.snapshot.paramMap.get('id')
  childId = this.route.snapshot.paramMap.get('childId')

  filtration :SearchModel = {...BaseSearchModel}
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
    private route: ActivatedRoute,
    private exportService:ExportService) { }

  ngOnInit(): void {
    this.getCertificate()
  }

  getCertificate(){
    this.certificates.loading=true
    this.certificates.list=[]
    this.studentService.getCertificatesList(this.studentId || this.childId, this.filtration).subscribe(res =>{
      this.certificates.loading=false
      this.certificates.list = res.data
      this.certificates.totalAllData = res.totalAllData
      this.certificates.total =res.total
    },err=>{
      this.certificates.loading=false
      this.certificates.total=0
    })
  }


  viewCertificate(certificate){
    window.open(`${environment.clientUrl}/certificate/${certificate?.paymentRefNo || certificate?.id}?qrc=${!certificate?.createdBySpeaAdmin}`)
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

  onExport(fileType: FileTypeEnum){
    this.exportService.showLoader$.next(true)
    let filter = {...this.filtration,PageSize:this.certificates.totalAllData,Page:1}
    this.studentService.certificatesToExport(this.studentId||this.childId,filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.parents.certificateList'))
    })
  }


  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.filtration.PageSize = event.rows
    this.getCertificate()

  }

}
