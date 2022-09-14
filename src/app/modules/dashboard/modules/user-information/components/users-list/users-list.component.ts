import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { iuser } from 'src/app/core/Models/iuser';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/core/services/user.service';
import { paginationState } from 'src/app/core/models/pagination/pagination';


@Component({
  selector: 'app-view-list-of-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class ViewListOfUsersComponent implements OnInit {
  first = 0;
  rows = 4;
  usersList: iuser[] = [];
  faEllipsisVertical = faEllipsisVertical;
  cities: string[];
  constructor(private headerservice: HeaderService, private translate: TranslateService, private router: Router, private userInformation: UserService) { }

  ngOnInit(): void {


    this.headerservice.Header.next(
      {
        'breadCrump': [
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
  gotoAddUser() {
    this.router.navigate(['/dashboard/manager-tools/user-information/new-user']);
  }

}
