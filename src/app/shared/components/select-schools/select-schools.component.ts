import { Component, OnInit ,Input, inject,OnDestroy} from '@angular/core';
import { UserRolesService } from 'src/app/modules/user-roles/service/user-roles.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { Filtration } from 'src/app/core/helpers/filtration';
import { Filter } from 'src/app/core/models/filter/filter';
import { SchoolsService } from 'src/app/modules/schools/services/schools/schools.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';

@Component({
  selector: 'app-select-schools',
  templateUrl: './select-schools.component.html',
  styleUrls: ['./select-schools.component.scss']
})
export class SelectSchoolsComponent implements OnInit,OnDestroy{
  @Input('selectSchoolModelOpened') selectSchoolModelOpened:boolean=false;
  selectAllStatus:boolean=false;
  MarkedListLength:number=0;
  filtration :Filter = {...Filtration,curriculumId:null,StateId: null};
  schoolIsSelectedList=[];
  selectedSchoolIds=[];
  schools={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
  paginationState= paginationInitialState
  states$ = this.CountriesService.getAllStates();
  lang = inject(TranslationService).lang
  curriculums$ = this.sharedService.getAllCurriculum()
  constructor(private CountriesService:CountriesService,private schoolsService:SchoolsService,private sharedService: SharedService,private userRolesService: UserRolesService) { }

  ngOnInit(): void {

    this.userRolesService.MarkedListLength.subscribe((res)=>{this.MarkedListLength=res});
    this.filtration.Page=1;
    this.userRolesService.schoolSelectedList.subscribe((res)=>{
      this.selectedSchoolIds=res;
    });
    this.getSchools();
  }

  getSchools(page?){
    this.filtration.Page=page?page:1;
    this.filtration.PageSize=10;
    this.schools.loading=true
    this.schoolsService.getAllSchoolsInPopUp(this.filtration).subscribe((res)=>{
      this.sharedService.filterLoading.next(false);
      this.schools.loading = false
      this.schools.list = res.data
      this.schools.totalAllData = res.totalAllData
      this.schools.total =res.total;
      this.paginationState.rows=10
      if(this.selectedSchoolIds.length==this.schools.totalAllData) this.selectAllStatus=true;

    },err=> {
      this.schools.loading=false
      this.schools.total=0
      this.sharedService.filterLoading.next(false);
    });


  }

  getSelectedSchool()
  {
    this.MarkedListLength=this.selectedSchoolIds.length;
    console.log(this.selectedSchoolIds.length,this.schools.totalAllData)
    if(this.selectedSchoolIds.length==this.schools.totalAllData)
    {
      this.selectAllStatus=true;
    }
    else
    {
      this.selectAllStatus=false;
    }
  }

  onSort(e){
    if(e.order==-1)
    {this.filtration.SortBy="update"+e.field;}
    else
    {this.filtration.SortBy="old"+e.field;}
    this.getSchools();
  }

  clearFilter(){
    this.filtration.KeyWord =''
    this.filtration.City= null
    this.filtration.StateId= null
    this.filtration.Status = null
    this.filtration.curriculumId = null
    this.getSchools()
  }

closeModel()
{

  this.sharedService.openSelectSchoolsModel.next(false);
  this.selectedSchoolIds=[];
  this.MarkedListLength = 0;
}
showSelectedSchool()
{
  this.schoolIsSelectedList=this.selectedSchoolIds;
  this.sharedService.openSelectSchoolsModel.next(false);
  this.userRolesService.MarkedListLength.next(this.MarkedListLength)
  this.userRolesService.schoolSelectedList.next(this.schoolIsSelectedList);
}

selectAllSchools(value)
{
 if(value.checked)
 {
  this.filtration.Page=0;
  this.filtration.PageSize=this.schools.totalAllData;
  this.schoolsService.getAllSchoolsInPopUp(this.filtration).subscribe((res)=>{
    this.selectedSchoolIds=res.data;
    this.MarkedListLength=this.selectedSchoolIds.length;
  });
 }
 else
 {
  this.selectedSchoolIds=[];
  this.MarkedListLength=0;
 }

}


paginationChanged(event: paginationState) {
  this.filtration.Page = event.page;
  this.getSchools(this.filtration.Page);

}

ngOnDestroy(): void {
 this.closeModel()
}
}
