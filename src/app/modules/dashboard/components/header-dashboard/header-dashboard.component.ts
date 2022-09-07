import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { HeaderObj, Title } from 'src/app/core/Models/header-obj';
import { HeaderService } from 'src/app/core/services/Header/header.service';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.scss']
})
export class HeaderDashboardComponent implements OnInit {

  breadCrump:MenuItem[]
  mainTitle: Title;
  subTitle: Title
  showContactUs = false


  constructor(private headerService:HeaderService,private translate:TranslateService) { }

  ngOnInit(): void {
    
    this.headerService.Header.subscribe((response :HeaderObj)=>{
      this.breadCrump = response.breadCrump;
      this.mainTitle = response?.mainTitle;
      this.subTitle = response?.subTitle;
      this.showContactUs = response?.showContactUs

     });

   
   
  }
 

}
