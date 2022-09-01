import { Component, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { HeaderService } from 'src/app/core/services/Header/header.service';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.scss']
})
export class HeaderDashboardComponent implements OnInit {

  breadCrump:MenuItem[]
  home:  MenuItem
  mainTittle:string;
  constructor(private headerService:HeaderService,private translate:TranslateService) { }

  ngOnInit(): void {
    console.log("Header");
  
      console.log(this.headerService.Header);

    
    this.headerService.Header.subscribe((response)=>{this.breadCrump=response.breadCrump;
      this.home=response.home;
      this.mainTittle=response.mainTittle;
     });

   
   
  }
 

}
