import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Indexs } from 'src/app/core/models/indexs';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { IndexesService } from '../../service/indexes.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { paginationState } from 'src/app/core/models/pagination/pagination';

@Component({
  selector: 'app-indexes',
  templateUrl: './indexes.component.html',
  styleUrls: ['./indexes.component.scss']
})
export class IndexesComponent implements OnInit {
  IndexesList: Indexs[] = [];
  faEllipsisVertical = faEllipsisVertical;
  first = 0;
  rows = 4;
  cities: string[];
  constructor(private headerservice: HeaderService, private IndexesService: IndexesService, private translate: TranslateService, private router: Router) { }

  ngOnInit(): void {
    this.headerservice.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('sideBar.managerTools.children.System List') }],
      }
    );
    this.cities = this.IndexesService.cities;
    this.IndexesList = this.IndexesService.IndexesList;
  }

  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }
  gotoAddIndex() {
    this.router.navigate(['/dashboard/manager-tools/Indexes/New-Index']);
  }

  handleChangetoFemale(event) {
    let isChecked = event.checked;

    if (isChecked = 'true') {
      console.log('Male');
      //change status to Male in api
    }
    else {
      console.log('Female');
      //change status to Female in api
    }
  }
  handleChangetoMale(event) {
    let isChecked = event.checked;


    if (isChecked == 'true') {
      console.log('Male');
      //change status to Male in api
    }
    else {
      console.log('Female');
      //change status to Female in api
    }
  }

}
