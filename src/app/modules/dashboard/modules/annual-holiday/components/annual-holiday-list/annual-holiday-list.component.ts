import { Location } from '@angular/common';
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { IAnnualHoliday } from 'src/app/core/Models/annual-holidays/annual-holiday';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { AnnualHolidayService } from '../../service/annual-holiday.service';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-annual-holiday',
  templateUrl: './annual-holiday-list.component.html',
  styleUrls: ['./annual-holiday-list.component.scss']
})
export class AnnualHolidayComponent implements OnInit,OnDestroy{
  openModel:boolean=false;
  filtration = {...Filtration,Year: '',Curriculum:'',HolidayStatus: ''}
  allHolidayLength:number=1;
  col:string="";
  faEllipsisVertical = faEllipsisVertical;
  annualHolidayList: IAnnualHoliday[] = [];
  curriculumList;
  yearList;
  urlParameter:number=0;
  first:boolean=true;
  fixedLength:number=0;
  deletedHoliday;
  cities: string[];
  holidayStatusList;
  updatedHolidayId:number;
  isBtnLoading: boolean=false;
  paginationState= {...paginationInitialState};
  holiday={
    total:0,
    list:[],
    loading:true
  }
  subscription:Subscription;
  
	holidaysItems: MenuItem[]=[
		{label: this.translate.instant('shared.edit'), icon:'assets/images/dropdown/pen.svg',routerLink:"/dashboard/educational-settings/annual-holiday/edit-holiday/{{e.id}}"},
		
	];
  constructor(
    private toastService: ToastService,
    public confirmModelService: ConfirmModelService,
    private exportService: ExportService,
    private headerService: HeaderService,
    private annualHolidayService: AnnualHolidayService, private translate: TranslateService, private router: Router ,private route: ActivatedRoute) {


  }
  ngOnInit(): void {
    this.annualHolidayService.openModel.subscribe((res)=>{this.openModel=res;})
    // this.annualHolidayList=this.annualHolidayService.annualHolidayList;
    //  this.annualHolidayService.getAllcurriculumName().subscribe((res)=>{this.curriculumList=res.data;})
    this.getAllHolidays();
    // this.annualHolidayList=this.annualHolidayService.annualHolidayList;

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

    this.annualHolidayService.getAllcurriculumName().subscribe((res)=>{this.curriculumList=res.data;})
    this.holidayStatusList=this.annualHolidayService.holidayStatusList;
    //  this.annualHolidayService.getAllYears().subscribe((res)=>{this.yearList=res})
    



  }
  confirmDeleteListener(){
    this.subscription=this.confirmModelService.confirmed$.subscribe(val => {
      if (val) this.deleteHoliday(this.deletedHoliday)
      
    })
  }
  deleteHoliday(id)
  {
  
   this.annualHolidayService.deleteHoliday(id).subscribe((res)=>{
    this.toastService.success(this.translate.instant('dashboard.AnnualHoliday.Holiday deleted Successfully'));
   
   },(err)=>{
    this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));
   })

  }
  sortMe(e)
  {
    console.log(e.field);
    this.filtration.SortBy=e.field;
   
    
  }
  
  getAllHolidays(){
    this.annualHolidayService.getAllHolidays(this.filtration).subscribe((res)=>{
      this.holiday.loading = false;
      this.allHolidayLength=res.total;
      this.annualHolidayList=res.data;
      if(this.first)
      {
       this.fixedLength=this.allHolidayLength;
       this.holiday.total=this.fixedLength;
     }

  
    },(err)=>{this.holiday.loading = false;
      this.holiday.total=0
    });
   
  }
  clearFilter(){
    
    this.filtration.KeyWord =''
    this.filtration.Year= null;
    this.filtration.Curriculum= null;
    this.filtration.HolidayStatus ='';
    this.getAllHolidays();
  }


  onExport(fileType:FileEnum, table:Table){
    this.exportService.exportFile(fileType, table,this.annualHolidayList)
  }



  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page;
    this.getAllHolidays();

  }
  

  gotoAddHoliday() {
    this.router.navigate(['/dashboard/educational-settings/annual-holiday/new-holiday']);
  }

  saveForm(e)
  {
   this.annualHolidayService.openModel.next(false);
  }
 
  editHoliday(holiday)
  {
   this.updatedHolidayId=holiday.id;
   this.annualHolidayService.editedHoliday.next(holiday);
   this.annualHolidayService.openModel.next(true);
  }
  saveHoliday(e)
  {
    
    this.annualHolidayService.holiday.subscribe((updatedHoliday)=>{
     this.isBtnLoading=false;
      this.annualHolidayService.updateHoliday(this.updatedHolidayId,updatedHoliday).subscribe((res)=>{
        this.toastService.success(this.translate.instant('dashboard.AnnualHoliday.Holiday edited Successfully'));
      },(err)=>{
        this.isBtnLoading=false;
        this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));
      })
    });
  }
  openRow()
  {
     console.log("hello")
  }
  closeRow()
  {
    console.log("bye")

  }
  ngOnDestroy(): void {
   this.annualHolidayService.openModel.next(false);
 
 }
}
