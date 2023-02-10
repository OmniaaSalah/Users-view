import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-grace-periods-list',
  templateUrl: './grace-periods-list.component.html',
  styleUrls: ['./grace-periods-list.component.scss']
})
export class GracePeriodsListComponent implements OnInit {


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
    private settingService:SettingsService) { }

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

  editGracePeriod(gracePeriod){
    this.router.navigate(['/dashboard/manager-tools/settings/grace-period/',gracePeriod.gracePeriodId])
  }

}
