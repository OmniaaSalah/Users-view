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
  filtration = {...Filtration,Curriculum:'',HolidayStatus: ''}
  allHolidayLength:number=1;
  col:string="";
  faEllipsisVertical = faEllipsisVertical;
  curriculumList;
  annualCalenderId;
  yearList;
  urlParameter:number=0;
  first:boolean=true;
  fixedLength:number=0;
  editedHoliday;
  curriculumsIds;
  deletedHoliday;
  holidayStatusList;
  updatedHolidayId:number;
  paginationState= {...paginationInitialState};
  annualHolidays={
    total:0,
    totalAllData:0,
    list:undefined,
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
    this.confirmDeleteListener();
    this.annualHolidayService.openModel.subscribe((res)=>{this.openModel=res;})
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

    this.annualHolidayService.getAllcurriculumName().subscribe((res)=>{this.curriculumList=res.data;})
    this.holidayStatusList=this.annualHolidayService.holidayStatusList;

  }
  confirmDeleteListener(){
  
    this.subscription=this.confirmModelService.confirmed$.subscribe(val => {
      if (val) this.deleteHoliday(this.deletedHoliday)
      
    })
  }
  deleteHoliday(id)
  {
 
   this.annualHolidayService.deleteHoliday(id).subscribe((res)=>{
    this.getHolidaysinAnnualCalender(this.annualCalenderId);
    this.toastService.success(this.translate.instant('dashboard.AnnualHoliday.Holiday deleted Successfully'));
   
   },(err)=>{
    this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));
   })

  }
  sortMe(e)
  {
  
    this.filtration.SortBy=e.field;
   
    
  }
  
  getAllHolidays(){
 
    this.annualHolidayService.getAllHolidays(this.filtration).subscribe((res)=>{
      this.annualHolidays.loading = false;
      this.annualHolidays.list=res.data;
      this.annualHolidays.total=res.total;
      this.annualHolidays.totalAllData=res.totalAllData;
  
    },(err)=>{this.annualHolidays.loading = false;
      this.annualHolidays.total=0
    });
   
  }
  clearFilter(){
    
    this.filtration.KeyWord =''
    this.filtration.Year= null;
    this.filtration.Curriculum= null;
    this.filtration.HolidayStatus ='';
    this.getAllHolidays();
  }


  onExport(fileType: FileEnum, table:Table){
    let filter = {...this.filtration, PageSize:null}
    this.annualHolidayService.annualToExport(filter).subscribe( (res) =>{
      
      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.AnnualHoliday.List Of Annual Holidays'))
    })
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
   this.annualHolidayService.editedHoliday.next({
    name:holiday.name,
    dateFrom:holiday.dateFrom.substring(5,7)+"/"+holiday.dateFrom.substring(8,10),
    dateTo:holiday.dateTo.substring(5,7)+"/"+holiday.dateTo.substring(8,10),
    flexibilityStatus:this.holidayStatusList.find(s=>s.name.en==holiday.flexibilityStatus),
    curriculums:holiday.curriculums

  });
   this.annualHolidayService.openModel.next(true);
  }

  saveHoliday(e)
  {
   
     this.subscription=this.annualHolidayService.holiday.subscribe((updatedHoliday)=>{
      
      this.editedHoliday=updatedHoliday;
      this.editedHoliday.flexibilityStatus=this.editedHoliday.flexibilityStatus.id;
      this.editedHoliday.curriculumIds=[];
      this.editedHoliday.curriculums.forEach(element => {
      this.editedHoliday.curriculumIds.push(element.id)
      });
  
      this.editedHoliday={
        'name':{'ar':this.editedHoliday.name.ar,'en':this.editedHoliday.name.en },
        'dateFrom':this.editedHoliday.dateFrom,
        'dateTo': this.editedHoliday.dateTo,
        'flexibilityStatus':this.editedHoliday.flexibilityStatus,
        'curriculumIds': this.editedHoliday.curriculumIds,
        };
      
      this.annualHolidayService.updateHoliday(this.updatedHolidayId,this.editedHoliday).subscribe((res)=>{
        // this.isBtnLoading=false;
        this.openRow(this.annualCalenderId);
        this.toastService.success(this.translate.instant('dashboard.AnnualHoliday.Holiday edited Successfully'));
      },(err)=>{
        // this.isBtnLoading=false;
        this.toastService.error(this.translate.instant('dashboard.AnnualHoliday.error,please try again'));
      })
    });
    this.subscription?.unsubscribe();
  }

  openRow(annualCalenderId:number)
  {
    
    this.annualHolidays.list.find(c=>c.id==annualCalenderId).loading = true;

     this.getHolidaysinAnnualCalender(annualCalenderId);
  }

  getHolidaysinAnnualCalender(annualCalenderId:number)
  {
    
    this.annualHolidayService.getHolidaysByAnnualCalenderID(annualCalenderId,this.filtration).subscribe((res)=>{
      this.annualHolidays.list.find(c=>c.id==annualCalenderId).loading = false;
      this.annualHolidays.list.find(c=>c.id==annualCalenderId).holidays=res.data;
      this.annualHolidays.list.find(c=>c.id==annualCalenderId).total=res.total;
      this.annualHolidays.list.find(c=>c.id==annualCalenderId).totalAllData=res.totalAllData;
     
    },(err)=>{ this.annualHolidays.list.find(c=>c.id==annualCalenderId).loading= false;
      this.annualHolidays.list.find(c=>c.id==annualCalenderId).total=0
    });

  
  }
  closeRow()
  {
 

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.confirmModelService.confirmed$.next(null);
   this.annualHolidayService.openModel.next(false);
 
 }

}
