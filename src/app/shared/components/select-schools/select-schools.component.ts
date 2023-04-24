import { Component, OnInit ,Input, inject} from '@angular/core';
import { UserRolesService } from 'src/app/modules/user-roles/service/user-roles.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { Filtration } from 'src/app/core/classes/filtration';
import { Filter } from 'src/app/core/models/filter/filter';
import { SchoolsService } from 'src/app/modules/schools/services/schools/schools.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Component({
  selector: 'app-select-schools',
  templateUrl: './select-schools.component.html',
  styleUrls: ['./select-schools.component.scss']
})
export class SelectSchoolsComponent implements OnInit {
  @Input('selectSchoolModelOpened') selectSchoolModelOpened:boolean=false;
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
  states$ = this.CountriesService.getAllStates();
  lang = inject(TranslationService).lang
  curriculums$ = this.sharedService.getAllCurriculum()
  constructor(private CountriesService:CountriesService,private schoolsService:SchoolsService,private sharedService: SharedService,private userRolesService: UserRolesService) { }

  ngOnInit(): void {

    this.userRolesService.MarkedListLength.subscribe((res)=>{this.MarkedListLength=res});
    this.getSchools();
    this.userRolesService.schoolSelectedList.subscribe((res)=>{
      console.log(res)
      // this.selectedSchoolIds=res;
       res.forEach(school => {
      this.selectedSchoolIds.push(school.id)
      });
      // this.getSchools();
    //   this.schoolIsSelectedList.forEach(selectedSchool => {
    //     if(selectedSchool.isSelected==true)
    //     {this.selectedSchoolIds.push(selectedSchool.id)}

    //  });

    });
  }

  getSchools(){

    this.schools.loading=true
    this.schools.list=[];
    this.filtration.PageSize = this.schools.totalAllData;
    this.schoolsService.getAllSchoolsInPopUp(this.filtration).subscribe((res)=>{
      this.sharedService.filterLoading.next(false);
      this.schools.loading = false
      this.schools.list = res.data
      this.schools.totalAllData = res.totalAllData
      this.schools.total =res.total;



    },err=> {
      this.schools.loading=false
      this.schools.total=0
      this.sharedService.filterLoading.next(false);
    });


  }

  getSelectedSchool()
  {

    this.MarkedListLength=this.selectedSchoolIds.length;

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
    // this.filtration.Status =false;
    this.filtration.curriculumId = null
    this.getSchools()
  }

closeModel()
{
 this.sharedService.openSelectSchoolsModel.next(false);
}
showSelectedSchool()
{
  this.schools.list.forEach(school => {
    this.selectedSchoolIds.forEach(id => {
      if(school.id==id)
      {
        this.schoolIsSelectedList.push(school)
      }
    });

  });
  this.sharedService.openSelectSchoolsModel.next(false);
  this.userRolesService.MarkedListLength.next(this.MarkedListLength)
  this.userRolesService.schoolSelectedList.next(this.schoolIsSelectedList);
 console.log(this.schoolIsSelectedList)
}



}
