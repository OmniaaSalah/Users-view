import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { IAnnualHoliday } from 'src/app/core/Models/iannual-holiday';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { AnnualHolidayService } from '../../service/annual-holiday.service';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';

@Component({
  selector: 'app-annual-holiday',
  templateUrl: './annual-holiday-list.component.html',
  styleUrls: ['./annual-holiday-list.component.scss']
})
export class AnnualHolidayComponent implements OnInit {
  filtration = {...Filtration,Year: '',CurriculumName:'',HolidayStatus: ''}
  tableEmpty:boolean=false;
  allHolidayLength:number=1;
  col:string="";
  faEllipsisVertical = faEllipsisVertical;
  annualHolidayList: IAnnualHoliday[] = [];
  curriculumList;
  yearList;
  urlParameter:number=0;
  first = 0;
  rows = 4;
  cities: string[];
  holidayStatusList;
  
	holidaysItems: MenuItem[]=[
		{label: this.translate.instant('shared.edit'), icon:'assets/images/dropdown/pen.svg',routerLink:"/dashboard/educational-settings/annual-holiday/edit-holiday/{{e.id}}"},
		
	];
  constructor(
    private exportService: ExportService,
    private headerService: HeaderService,
    private annualHolidayService: AnnualHolidayService, private translate: TranslateService, private router: Router ,private route: ActivatedRoute) {


  }
  ngOnInit(): void {
     this.annualHolidayService.getAllCurriculum().subscribe((res)=>{this.curriculumList=res.data;console.log(this.curriculumList)})
    this.getAllHolidays();
    
    this.route.paramMap.subscribe(param => {
      this.urlParameter = Number(param.get('schoolId'));
    });

    this.headerService.Header.next(
      {
        breadCrump: [
          { label: this.translate.instant('dashboard.AnnualHoliday.List Of Annual Holidays') ,routerLink:'/dashboard/educational-settings/annual-holiday/annual-holiday-list'}
        ]
      }
    );

    this.annualHolidayService.getAllCurriculum().subscribe((res)=>{this.curriculumList=res.data;})
    this.holidayStatusList=this.annualHolidayService.holidayStatusList;
     this.annualHolidayService.getAllYear().subscribe((res)=>{ this.yearList=res;console.log(res)});
    



  }
  sortMe(e)
  {
    console.log(e.field);
    this.filtration.SortBy=e.field;
   
    
  }
  
  getAllHolidays(){
    this.annualHolidayService.getAllHolidays(this.filtration).subscribe((res)=>{
   
      this.allHolidayLength=res.total;
      this.annualHolidayList=res.data;

      if(this.allHolidayLength==0)
      {this.tableEmpty=true;}
      else
      {this.tableEmpty=false;}
    });
   
  }
  clearFilter(){
    
    this.filtration.KeyWord =''
    this.filtration.Year= null;
    this.filtration.CurriculumName= null;
    this.filtration.HolidayStatus ='';
    this.getAllHolidays();
  }


  onExport(fileType:FileEnum, table:Table){
    this.exportService.exportFile(fileType, table,this.annualHolidayList)
  }



  paginationChanged(event: paginationState) {
    console.log(event);
    this.first = event.first
    this.rows = event.rows

    this.filtration.Page = event.page

    this.getAllHolidays();

  }
  

  gotoAddHoliday() {
    this.router.navigate(['/dashboard/educational-settings/annual-holiday/new-holiday']);
  }
}
