import { Component, OnInit,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { IHeader, ITitle } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  homePage=inject(TranslateService).get('Home Page')
  breadCrump: MenuItem[]
  mainTitle: ITitle;
  subTitle: ITitle;

  constructor(
    private headerService: HeaderService) { }

  ngOnInit(): void {

    this.headerService.Header.subscribe((response: IHeader) => {

      this.breadCrump = response.breadCrump;
      this.mainTitle = response?.mainTitle;
      this.subTitle = response?.subTitle;


    });


  }




}
