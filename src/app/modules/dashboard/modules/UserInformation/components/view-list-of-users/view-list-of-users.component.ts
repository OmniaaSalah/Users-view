import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/core/Models/user';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/core/services/user.service';
import { paginationState } from 'src/app/core/Models/pagination/pagination';


@Component({
  selector: 'app-view-list-of-users',
  templateUrl: './view-list-of-users.component.html',
  styleUrls: ['./view-list-of-users.component.scss']
})
export class ViewListOfUsersComponent implements OnInit {
  first=0;
	rows =4;
  UsersList:User[]=[];
  faEllipsisVertical=faEllipsisVertical;
  cities: string[];
  constructor(private headerservice:HeaderService,private translate:TranslateService,private router:Router,private userInformation:UserService) { }

  ngOnInit(): void {
  

    this.headerservice.Header.next(
      {'breadCrump':  [
        {label: this.translate.instant('dashboard.UserInformation.List Of Users')}],
        'home':{icon: 'pi pi-home', routerLink: '/'},
        'mainTittle':""
      }
      );
      this.cities=this.userInformation.cities;
    this.UsersList=this.userInformation.UsersList;
  }

  onTableDataChange(event:paginationState) {
    this.first = event.first
		this.rows = event.rows
    
  }
  gotoAddUser()
  {
    this.router.navigate(['/dashboard/manager-tools/UserInformation/NewUser']);
  }

}
