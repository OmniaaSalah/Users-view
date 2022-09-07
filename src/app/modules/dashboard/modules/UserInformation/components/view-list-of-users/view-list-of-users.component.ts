import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/core/Models/user';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-view-list-of-users',
  templateUrl: './view-list-of-users.component.html',
  styleUrls: ['./view-list-of-users.component.scss']
})
export class ViewListOfUsersComponent implements OnInit {
  page: number = 1;
  tableSize: number = 7;
  UsersList:User[]=[];
  faEllipsisVertical=faEllipsisVertical;
 
  constructor(private headerservice:HeaderService,private translate:TranslateService,private router:Router,private userInformation:UserService) { }

  ngOnInit(): void {
  

    this.headerservice.Header.next(
      {'breadCrump':  [
        {label: this.translate.instant('dashboard.UserInformation.List Of Users')}],
      }
      );
    this.UsersList=this.userInformation.UsersList;
  }

  onTableDataChange(event: number) {
    this.page = event;
    
  }
  gotoAddUser()
  {
    this.router.navigate(['/dashboard/manager-tools/UserInformation/NewUser']);
  }

}
