import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/classes/filtration';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SchoolsService } from '../../../services/schools/schools.service';

@Component({
  selector: 'app-annul-holiday-list',
  templateUrl: './annul-holiday-list.component.html',
  styleUrls: ['./annul-holiday-list.component.scss']
})
export class AnnulHolidayListComponent implements OnInit {
  @Input('holidays') holidays=[]
  first = 0
  rows = 4

  schoolId = this.route.snapshot.paramMap.get('schoolId')
  filtration={...Filtration}
  
  selectedHoliday
  openHolidaytModel=false

  menuItems: MenuItem[]=[
    {label: this.translate.instant('shared.edit'), icon:'assets/images/shared/pen.svg'},
    {label: this.translate.instant('dashboard.schools.sendEditHolidayReq'), icon:'assets/images/shared/list.svg'},
  ];



  editHolidayForm = this.fb.group({
    id:[],
    startDate:[],
    endDate:[],
    cause:[]
  })
  
  constructor(
    private route: ActivatedRoute,
    private schoolsService:SchoolsService,
    private translate: TranslateService,
    private fb:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onItemClicked(index, holiday){
    if(index ==0) this.router.navigate(['dashboard/educational-settings/annual-holiday/edit-holiday/',1])
    
    else if(index==1){ 
      this.selectedHoliday= this.holidays[index]
      this.openHolidaytModel=true
    }

  }

  paginationChanged(event: paginationState) {
		console.log(event);
		this.first = event.first
		this.rows = event.rows
	}

}
