import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from 'src/app/core/Models/iuser';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/core/services/user.service';
import { paginationState } from 'src/app/core/models/pagination/pagination';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-view-list-of-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class ViewListOfUsersComponent implements OnInit {
  first = 0;
  rows = 4;
  usersList: IUser[] = [];
  faEllipsisVertical = faEllipsisVertical;
  cities: string[];
  @Input('filterFormControls') formControls:string[] =[]

  showFilterBox = false
  searchText=""

  showFilterModel=false

  filterForm

  constructor(private headerService: HeaderService, private translate: TranslateService, private router: Router, private userInformation: UserService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initForm()

    this.headerService.Header.next(
      {
        'breadCrump': [
          // { label: this.translate.instant('breadcrumb.School Years List'),routerLink:'/dashboard/educational-settings/school-year/school-years-list'}
          { label: this.translate.instant('dashboard.UserInformation.List Of Users') }],
      }
    );
    this.cities = this.userInformation.cities;
    this.usersList = this.userInformation.usersList;
  }

  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }

  initForm(){
    this.filterForm= this.fb.group(()=>{
      let formGroup={}
      this.formControls.forEach(item =>{

        formGroup[item] =[]
      })
      console.log(formGroup);
      return formGroup
    })

    // let formGroup={}
    // this.formControls.forEach(item =>{

    //   formGroup[item] =[]
    // })
    // console.log(formGroup);
    // return formGroup
  }


  submitForm(){
    this.showFilterModel = false
  }

  clearForm(){
    this.showFilterModel = false

  }
}
