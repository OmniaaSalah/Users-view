import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/helpers/filtration';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SettingsService } from '../../services/settings/settings.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Component({
  selector: 'app-grace-periods-list',
  templateUrl: './grace-periods-list.component.html',
  styleUrls: ['./grace-periods-list.component.scss']
})
export class GracePeriodsListComponent implements OnInit {

  lang = inject(TranslationService).lang
  Items: MenuItem[]=[{label: this.translate.instant('shared.edit'), icon:'assets/images/shared/pen.svg'},]


  filtration={...Filtration}
  paginationState= {...paginationInitialState}
  periods={
    totalAllData:0,
    total:0,
    list:[],
    loading:false
  }

  constructor(
    private translate:TranslateService,
    private router:Router,
    private settingService:SettingsService,
    private exportService:ExportService) { }

  ngOnInit(): void {
    this.getGracePeriodsList()
  }



  getGracePeriodsList(){
    this.periods.list=[]
    this.periods.loading=true
    this.settingService.getGracePeriodList(this.filtration).subscribe(res =>{
      this.periods.list = res.data
      this.periods.total = res.total
      this.periods.totalAllData = res.totalAllData
      this.periods.loading=false

    },err =>{
      this.periods.loading=false
    })
  }


  onExport(fileType: FileTypeEnum){
    this.exportService.showLoader$.next(true)
    let filter = {...this.filtration,PageSize:this.periods.totalAllData,Page:1}
    this.settingService.getGracePeriodListToExport(filter).subscribe( (res:any) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.SystemSetting.graceSession'))
    })
  }


  editGracePeriod(gracePeriod){
    this.router.navigate(['/manager-tools/settings/grace-period/',gracePeriod.gracePeriodId])
  }


  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.getGracePeriodsList()

  }

}
