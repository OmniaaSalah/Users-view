import { Component, OnInit ,Input} from '@angular/core';
import { UserRolesService } from 'src/app/modules/dashboard/modules/user-roles/service/user-roles.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { Filtration } from 'src/app/core/classes/filtration';
import { Filter } from 'src/app/core/models/filter/filter';
import { SchoolsService } from 'src/app/modules/dashboard/modules/schools/services/schools/schools.service';

@Component({
  selector: 'app-select-schools',
  templateUrl: './select-schools.component.html',
  styleUrls: ['./select-schools.component.scss']
})
export class SelectSchoolsComponent implements OnInit {
  @Input('selectSchoolModelOpened') selectSchoolModelOpened:boolean=false;
  MarkedListLength:number=0;
  filtration :Filter = {...Filtration,curriculumId:null,StateId: null};
  schoolIsSelectedList;
  schools={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }
  states$ = this.CountriesService.getAllStates();
  
  curriculums$ = this.sharedService.getAllCurriculum()
  constructor(private CountriesService:CountriesService,private schoolsService:SchoolsService,private sharedService: SharedService,private userRolesService: UserRolesService) { }

  ngOnInit(): void {
   
    this.userRolesService.MarkedListLength.subscribe((res)=>{this.MarkedListLength=res});
    this.getSchools();
    this.userRolesService.schoolSelectedList.subscribe((res)=>{
      this.schoolIsSelectedList=res;
      this.getSchools();
    
    });
  }

  getSchools(){
  
    this.schools.loading=true
    this.schools.list=[];
    this.schoolsService.getAllSchools(this.filtration).subscribe((res)=>{
      this.schools.loading = false
      this.schools.list = res.data
      this.schools.totalAllData = res.totalAllData
      this.schools.total =res.total;
      this.schools.list.forEach(school => {
        this.schoolIsSelectedList.forEach(selectedSchool => {
          if(school.id==selectedSchool.id)
          {
            school.isSelected=selectedSchool.isSelected;
          }
          
        });
      });
      
    },err=> {
      this.schools.loading=false
      this.schools.total=0
    });
  
 
  }

  getSelectedSchool(e,id)
  {

    this.schoolIsSelectedList.forEach(school => {
      if(id==school.id)
      {

       if(e.checked)
        { school.isSelected=true;
          this.userRolesService.MarkedListLength.next(this.MarkedListLength+=1); 
          this.schools.list.forEach(element => {
            if(element.id==id)
            {
              element.isSelected=true;
        
            }
          });
        }
        else
        {school.isSelected=false;
          this.userRolesService.MarkedListLength.next(this.MarkedListLength-=1); 
          this.schools.list.forEach(element => {
            if(element.id==id)
            {
              element.isSelected=false;
             
            }
          });
        }
      }
    });
  

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
  this.sharedService.openSelectSchoolsModel.next(false); 

  this.userRolesService.schoolSelectedList.next(this.schoolIsSelectedList);

}
  

}
